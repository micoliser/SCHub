#!/usr/bin/env bash

# remove the previous schub folder
cd /root/
rm -rf SCHub/

# Add a fresh pull of the website
git clone https://$GIT_TOKEN@github.com/micoliser/SCHub.git
# Copy environment variables and sql-setup
cp .env SCHub/

# Generate a new datadump and cleanup unnecessary csv files
cd SCHub/data/small/
python3 generate_dump.py
rm *.csv
mv dump.sql ../

echo -e "\n\nKill gunicorn and create new data\n\n"
cd /root/SCHub/data/
## Regenerate the data
pkill gunicorn
echo -e "\n\nMySQL: Enter root password\n\n"
cat setup_dev_db.sql | mysql -u root -p

echo "Create a new tmux session and rerun api"
cd /root/SCHub/
tmux kill-session -t gunicorn-session
tmux new-session -d -s gunicorn-session
tmux send -t gunicorn-session.0 'gunicorn --workers=3 --access-logfile access.log --error-logfile error.log --bind 0.0.0.0:5000 api.app:app' ENTER

cd data/
echo -e "\n\nMySQL: Enter root password\n\n"
cat dump.sql | mysql -u root -p

# Rebuild the app, change to production server
# Also move the build folder to the schub production directory
echo -e "\n\nRun npm build version\n\n"
cd /root/SCHub/schub/
npm install
npm run build
cd build/static/js/
sed -i 's|http\://localhost\:5000|https\://www.schub.me|g' main.*js
cd /root/SCHub/schub/
cp -R build/* /var/www/html/schub/
service nginx restart
# Redeploy app on webserver
ssh root@147.182.233.55 'rm -rf /var/www/html/schub/*'
scp -r -i /root/.ssh/id_rsa /root/SCHub/schub/build/* root@147.182.233.55:/var/www/html/schub/
ssh root@147.182.233.55 'service nginx restart'
