USE schub;
INSERT INTO `admins` (id, created_at, first_name, last_name, email, password) VALUES ('53af4926-52ee-41d0-9acc-ae7230000001','2017-03-25 02:17:06','Aina','Jesulayomi','jesulayomi081@gmail.com','ajpwd'),('53af4926-52ee-41d0-9acc-ae7230000002','2017-03-25 02:17:06','Iwelumo','Samuel','micoliser@gmail.com','ispwd');
INSERT INTO `departments` (id, name, created_at) VALUES ('53af4926-52ee-41d0-9acc-ae7230300001','Aerospace Engineering','2017-03-25 02:17:06'),('53af4926-52ee-41d0-9acc-ae7230300002','Aerothermal Engineering','2017-03-25 02:17:06'),('53af4926-52ee-41d0-9acc-ae7230300003','Agricultural Engineering','2017-03-25 02:17:06');
INSERT INTO `teachers` (department_id, id, created_at, first_name, last_name, email, password) VALUES ('53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230400001','2017-03-25 02:17:06','NORRIN','DANYAR','NORRIND@schub.com','NORRINDPWD'),('53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230400002','2017-03-25 02:17:06','LARIS','JACKSON-GRANT','LARISJ@schub.com','LARISJPWD'),('53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230400003','2017-03-25 02:17:06','GRAEME-JAMES','CONSTADINOS','GRAEME-JAMESC@schub.com','GRAEME-JAMESCPWD'),('53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230400004','2017-03-25 02:17:06','KAHNEIL','LUCIAN-BAILEY','KAHNEILL@schub.com','KAHNEILLPWD'),('53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230400005','2017-03-25 02:17:06','BARTOLOMEO','ELISA','BARTOLOMEOE@schub.com','BARTOLOMEOEPWD'),('53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230400006','2017-03-25 02:17:06','TIARE','KILISI','TIAREK@schub.com','TIAREKPWD'),('53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230400007','2017-03-25 02:17:06','ILGVARS','RAVINESH','ILGVARSR@schub.com','ILGVARSRPWD'),('53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230400008','2017-03-25 02:17:06','GIOCONDO','RAVEE','GIOCONDOR@schub.com','GIOCONDORPWD'),('53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230400009','2017-03-25 02:17:06','OLIVERS','LORRAINE','OLIVERSL@schub.com','OLIVERSLPWD'),('53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230400010','2017-03-25 02:17:06','PAHUL','TESLOACH','PAHULT@schub.com','PAHULTPWD'),('53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230400011','2017-03-25 02:17:06','JEMMIE','IRVINE','JEMMIEI@schub.com','JEMMIEIPWD'),('53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230400012','2017-03-25 02:17:06','MAZI','AADIL','MAZIA@schub.com','MAZIAPWD'),('53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230400013','2017-03-25 02:17:06','DEKOTA','THEOHARIS','DEKOTAT@schub.com','DEKOTATPWD'),('53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230400014','2017-03-25 02:17:06','MELVEN','DARRAL','MELVEND@schub.com','MELVENDPWD'),('53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230400015','2017-03-25 02:17:06','DJUMA','RINALDO','DJUMAR@schub.com','DJUMARPWD');
INSERT INTO `courses` (name, level, department_id, teacher_id, id, created_at) VALUES ('Math for Aerospace Engineering',1,'53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230400001','53af4926-52ee-41d0-9acc-ae7230500001','2017-03-25 02:17:06'),('Eng for Aerospace Engineering',1,'53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230400002','53af4926-52ee-41d0-9acc-ae7230500002','2017-03-25 02:17:06'),('Drawing for Aerospace Engineering',1,'53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230400003','53af4926-52ee-41d0-9acc-ae7230500003','2017-03-25 02:17:07'),('Electicity for Aerospace Engineering',1,'53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230400004','53af4926-52ee-41d0-9acc-ae7230500004','2017-03-25 02:17:06'),('Logic for Aerospace Engineering',1,'53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230400005','53af4926-52ee-41d0-9acc-ae7230500005','2017-03-25 02:17:06'),('Mechanics for Aerospace Engineering',2,'53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230400001','53af4926-52ee-41d0-9acc-ae7230500006','2017-03-25 02:17:06'),('Thermodynamics for Aerospace Engineering',2,'53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230400002','53af4926-52ee-41d0-9acc-ae7230500007','2017-03-25 02:17:06'),('Basics for Aerospace Engineering',2,'53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230400003','53af4926-52ee-41d0-9acc-ae7230500008','2017-03-25 02:17:06'),('Advanced for Aerospace Engineering',2,'53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230400004','53af4926-52ee-41d0-9acc-ae7230500009','2017-03-25 02:17:07'),('Specialization for Aerospace Engineering',3,'53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230400005','53af4926-52ee-41d0-9acc-ae7230500010','2017-03-25 02:17:06'),('Control-Systems for Aerospace Engineering',3,'53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230400001','53af4926-52ee-41d0-9acc-ae7230500011','2017-03-25 02:17:06'),('Power-Systems for Aerospace Engineering',3,'53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230400002','53af4926-52ee-41d0-9acc-ae7230500012','2017-03-25 02:17:07'),('Switchgear-Technology for Aerospace Engineering',4,'53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230400003','53af4926-52ee-41d0-9acc-ae7230500013','2017-03-25 02:17:06'),('Circuit-Techniques for Aerospace Engineering',4,'53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230400004','53af4926-52ee-41d0-9acc-ae7230500014','2017-03-25 02:17:06'),('Micro-computers for Aerospace Engineering',4,'53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230400005','53af4926-52ee-41d0-9acc-ae7230500015','2017-03-25 02:17:06'),('Math for Aerothermal Engineering',1,'53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230400006','53af4926-52ee-41d0-9acc-ae7230500016','2017-03-25 02:17:06'),('Eng for Aerothermal Engineering',1,'53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230400007','53af4926-52ee-41d0-9acc-ae7230500017','2017-03-25 02:17:06'),('Drawing for Aerothermal Engineering',1,'53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230400008','53af4926-52ee-41d0-9acc-ae7230500018','2017-03-25 02:17:06'),('Electicity for Aerothermal Engineering',1,'53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230400009','53af4926-52ee-41d0-9acc-ae7230500019','2017-03-25 02:17:06'),('Logic for Aerothermal Engineering',1,'53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230400010','53af4926-52ee-41d0-9acc-ae7230500020','2017-03-25 02:17:06'),('Mechanics for Aerothermal Engineering',2,'53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230400006','53af4926-52ee-41d0-9acc-ae7230500021','2017-03-25 02:17:06'),('Thermodynamics for Aerothermal Engineering',2,'53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230400007','53af4926-52ee-41d0-9acc-ae7230500022','2017-03-25 02:17:06'),('Basics for Aerothermal Engineering',2,'53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230400008','53af4926-52ee-41d0-9acc-ae7230500023','2017-03-25 02:17:06'),('Advanced for Aerothermal Engineering',2,'53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230400009','53af4926-52ee-41d0-9acc-ae7230500024','2017-03-25 02:17:06'),('Specialization for Aerothermal Engineering',3,'53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230400010','53af4926-52ee-41d0-9acc-ae7230500025','2017-03-25 02:17:06'),('Control-Systems for Aerothermal Engineering',3,'53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230400006','53af4926-52ee-41d0-9acc-ae7230500026','2017-03-25 02:17:06'),('Power-Systems for Aerothermal Engineering',3,'53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230400007','53af4926-52ee-41d0-9acc-ae7230500027','2017-03-25 02:17:06'),('Switchgear-Technology for Aerothermal Engineering',4,'53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230400008','53af4926-52ee-41d0-9acc-ae7230500028','2017-03-25 02:17:06'),('Circuit-Techniques for Aerothermal Engineering',4,'53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230400009','53af4926-52ee-41d0-9acc-ae7230500029','2017-03-25 02:17:06'),('Micro-computers for Aerothermal Engineering',4,'53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230400010','53af4926-52ee-41d0-9acc-ae7230500030','2017-03-25 02:17:06'),('Math for Agricultural Engineering',1,'53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230400011','53af4926-52ee-41d0-9acc-ae7230500031','2017-03-25 02:17:06'),('Eng for Agricultural Engineering',1,'53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230400012','53af4926-52ee-41d0-9acc-ae7230500032','2017-03-25 02:17:06'),('Drawing for Agricultural Engineering',1,'53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230400013','53af4926-52ee-41d0-9acc-ae7230500033','2017-03-25 02:17:06'),('Electicity for Agricultural Engineering',1,'53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230400014','53af4926-52ee-41d0-9acc-ae7230500034','2017-03-25 02:17:06'),('Logic for Agricultural Engineering',1,'53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230400015','53af4926-52ee-41d0-9acc-ae7230500035','2017-03-25 02:17:06'),('Mechanics for Agricultural Engineering',2,'53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230400011','53af4926-52ee-41d0-9acc-ae7230500036','2017-03-25 02:17:06'),('Thermodynamics for Agricultural Engineering',2,'53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230400012','53af4926-52ee-41d0-9acc-ae7230500037','2017-03-25 02:17:06'),('Basics for Agricultural Engineering',2,'53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230400013','53af4926-52ee-41d0-9acc-ae7230500038','2017-03-25 02:17:06'),('Advanced for Agricultural Engineering',2,'53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230400014','53af4926-52ee-41d0-9acc-ae7230500039','2017-03-25 02:17:06'),('Specialization for Agricultural Engineering',3,'53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230400015','53af4926-52ee-41d0-9acc-ae7230500040','2017-03-25 02:17:06'),('Control-Systems for Agricultural Engineering',3,'53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230400011','53af4926-52ee-41d0-9acc-ae7230500041','2017-03-25 02:17:06'),('Power-Systems for Agricultural Engineering',3,'53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230400012','53af4926-52ee-41d0-9acc-ae7230500042','2017-03-25 02:17:06'),('Switchgear-Technology for Agricultural Engineering',4,'53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230400013','53af4926-52ee-41d0-9acc-ae7230500043','2017-03-25 02:17:06'),('Circuit-Techniques for Agricultural Engineering',4,'53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230400014','53af4926-52ee-41d0-9acc-ae7230500044','2017-03-25 02:17:06'),('Micro-computers for Agricultural Engineering',4,'53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230400015','53af4926-52ee-41d0-9acc-ae7230500045','2017-03-25 02:17:06');
INSERT INTO `students` (age, start_level, current_level, matric_no, department_id, id, created_at, first_name, last_name, email, password) VALUES (23,1,1,'202210001KK','53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230200001','2017-03-25 02:17:06','KRAGG','KELSEY','KRAGGK@schub.com','KRAGGKPWD'),(24,1,1,'202210002SN','53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230200002','2017-03-25 02:17:06','SULIMAN','NICKHOLAS','SULIMANN@schub.com','SULIMANNPWD'),(19,1,1,'202210003CR','53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230200003','2017-03-25 02:17:06','CHANSOTHEA','ROLTON','CHANSOTHEAR@schub.com','CHANSOTHEARPWD'),(28,2,2,'202110004TM','53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230200004','2017-03-25 02:17:06','TAMARA','MITIADY','TAMARAM@schub.com','TAMARAMPWD'),(20,2,2,'202110005ZK','53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230200005','2017-03-25 02:17:06','ZAYED','KALAM','ZAYEDK@schub.com','ZAYEDKPWD'),(17,2,2,'202210006SB','53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230200006','2017-03-25 02:17:06','SERGEI','BASILI','SERGEIB@schub.com','SERGEIBPWD'),(29,3,3,'202210007BA','53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230200007','2017-03-25 02:17:06','BENEDICTO','A-JAY','BENEDICTOA@schub.com','BENEDICTOAPWD'),(30,3,3,'202210008KJ','53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230200008','2017-03-25 02:17:06','KRISTAPS','JOSHUA-LEE','KRISTAPSJ@schub.com','KRISTAPSJPWD'),(20,4,4,'202210009JY','53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230200009','2017-03-25 02:17:06','JEREMISZ','YOUSIF','JEREMISZY@schub.com','JEREMISZYPWD'),(18,4,4,'202210010HT','53af4926-52ee-41d0-9acc-ae7230300001','53af4926-52ee-41d0-9acc-ae7230200010','2017-03-25 02:17:06','HEMMING','TALOR','HEMMINGT@schub.com','HEMMINGTPWD'),(25,1,1,'202210011AH','53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230200011','2017-03-25 02:17:06','ATHANASSI','HEIDI','ATHANASSIH@schub.com','ATHANASSIHPWD'),(26,1,1,'202210012HS','53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230200012','2017-03-25 02:17:06','HASANAIN','STYVEN','HASANAINS@schub.com','HASANAINSPWD'),(27,1,1,'202110013AS','53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230200013','2017-03-25 02:17:06','AIJAY','SEN','AIJAYS@schub.com','AIJAYSPWD'),(29,2,2,'202210014TC','53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230200014','2017-03-25 02:17:06','TATU-HANNES','CRESSWELL','TATU-HANNESC@schub.com','TATU-HANNESCPWD'),(17,2,2,'202210015TJ','53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230200015','2017-03-25 02:17:06','TASHVIR','JARRON','TASHVIRJ@schub.com','TASHVIRJPWD'),(20,2,2,'202210016DN','53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230200016','2017-03-25 02:17:06','DEREC','NARDENE','DERECN@schub.com','DERECNPWD'),(16,3,3,'202210017ST','53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230200017','2017-03-25 02:17:06','SUSANTI','TONY','SUSANTIT@schub.com','SUSANTITPWD'),(22,3,3,'202210018EP','53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230200018','2017-03-25 02:17:06','ELIJA','PEDROS','ELIJAP@schub.com','ELIJAPPWD'),(30,4,4,'202110019RM','53af4926-52ee-41d0-9acc-ae7230300002','53af4926-52ee-41d0-9acc-ae7230200019','2017-03-25 02:17:06','REESHABH','MACKLEN','REESHABHM@schub.com','REESHABHMPWD'),(22,4,4,'202210020CJ','53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230200020','2017-03-25 02:17:06','CHADE','JASUR','CHADEJ@schub.com','CHADEJPWD'),(28,1,1,'202210021CC','53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230200021','2017-03-25 02:17:06','CAREX','CARMELLO','CAREXC@schub.com','CAREXCPWD'),(29,1,1,'202110022ED','53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230200022','2017-03-25 02:17:06','EMMANOUEL','DOMINCO','EMMANOUELD@schub.com','EMMANOUELDPWD'),(17,1,1,'202110023IM','53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230200023','2017-03-25 02:17:06','INTHAVANH','MARINUS','INTHAVANHM@schub.com','INTHAVANHMPWD'),(29,2,2,'202210024CS','53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230200024','2017-03-25 02:17:06','CLASH','SAVAIN','CLASHS@schub.com','CLASHSPWD'),(20,2,2,'202110025TT','53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230200025','2017-03-25 02:17:06','TAVGUN','THANASE','TAVGUNT@schub.com','TAVGUNTPWD'),(21,2,2,'202210026FC','53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230200026','2017-03-25 02:17:06','FIDON','CRETINEZ','FIDONC@schub.com','FIDONCPWD'),(22,3,3,'202110027CL','53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230200027','2017-03-25 02:17:06','COSTATINOS','LORRY','COSTATINOSL@schub.com','COSTATINOSLPWD'),(27,3,3,'202110028JS','53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230200028','2017-03-25 02:17:06','JODAN','SHRAVENN','JODANS@schub.com','JODANSPWD'),(28,4,4,'202110029JN','53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230200029','2017-03-25 02:17:06','JESSIE-JAMIE','NHIM','JESSIE-JAMIEN@schub.com','JESSIE-JAMIENPWD'),(30,4,4,'202210030AP','53af4926-52ee-41d0-9acc-ae7230300003','53af4926-52ee-41d0-9acc-ae7230200030','2017-03-25 02:17:06','ALIRIZA','PALYOLOGOS','ALIRIZAP@schub.com','ALIRIZAPPWD');