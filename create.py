from models import storage
from models.admin import Admin
a = Admin(first_name='Test', last_name='Admin', email='testadmin@gmail.com', password='test')
storage.new(a)
storage.save()
