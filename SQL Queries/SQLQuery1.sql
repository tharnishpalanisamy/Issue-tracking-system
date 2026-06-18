--users
CREATE TABLE Users (
    id VARCHAR(20) PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    department VARCHAR(50),
    designation VARCHAR(50),
    dateOfJoining DATETIME
);

--users
INSERT INTO Users
(id, email, name, password, department, designation, dateOfJoining)
VALUES

('4lw0sIqJaK4','rahul.107@company.com','Rahul Verma','hashed_password_123','Research','Data Analyst','2025-01-19 09:00:00'),

('USR001','priya.sharma@company.com','Priya Sharma','hashed_password_124','HR','HR Executive','2024-03-15 09:00:00'),

('USR002','arjun.kumar@company.com','Arjun Kumar','hashed_password_125','IT','Software Engineer','2023-07-10 09:00:00'),

('USR003','meera.iyer@company.com','Meera Iyer','hashed_password_126','Finance','Accountant','2022-11-21 09:00:00'),

('USR004','vijay.singh@company.com','Vijay Singh','hashed_password_127','Operations','Operations Manager','2021-08-12 09:00:00'),

('USR005','ananya.reddy@company.com','Ananya Reddy','hashed_password_128','Marketing','Marketing Specialist','2024-01-05 09:00:00'),

('USR006','rohit.gupta@company.com','Rohit Gupta','hashed_password_129','Research','Research Associate','2023-05-18 09:00:00'),

('USR007','kavya.nair@company.com','Kavya Nair','hashed_password_130','IT','Frontend Developer','2024-06-25 09:00:00'),

('USR008','sanjay.patel@company.com','Sanjay Patel','hashed_password_131','Finance','Financial Analyst','2022-09-08 09:00:00'),

('USR009','divya.jain@company.com','Divya Jain','hashed_password_132','HR','Recruiter','2023-12-11 09:00:00'),

('USR010','nikhil.menon@company.com','Nikhil Menon','hashed_password_133','IT','Backend Developer','2025-02-01 09:00:00'),

('USR011','pooja.agarwal@company.com','Pooja Agarwal','hashed_password_134','Marketing','SEO Analyst','2024-04-09 09:00:00'),

('USR012','aman.mishra@company.com','Aman Mishra','hashed_password_135','Operations','Supervisor','2021-10-14 09:00:00'),

('USR013','sneha.rao@company.com','Sneha Rao','hashed_password_136','Research','Data Scientist','2023-08-20 09:00:00'),

('USR014','karan.malhotra@company.com','Karan Malhotra','hashed_password_137','Finance','Finance Manager','2020-07-01 09:00:00'),

('USR015','isha.kapoor@company.com','Isha Kapoor','hashed_password_138','HR','HR Manager','2019-05-16 09:00:00'),

('USR016','aditya.saxena@company.com','Aditya Saxena','hashed_password_139','IT','UI/UX Designer','2024-02-28 09:00:00'),

('USR017','neha.chopra@company.com','Neha Chopra','hashed_password_140','Marketing','Content Strategist','2022-06-17 09:00:00'),

('USR018','rakesh.yadav@company.com','Rakesh Yadav','hashed_password_141','Operations','Team Lead','2021-04-22 09:00:00'),

('USR019','tanya.bose@company.com','Tanya Bose','hashed_password_142','Research','Business Analyst','2025-03-12 09:00:00');





--issues
CREATE TABLE Issues (
    Id VARCHAR(50) PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Details VARCHAR(MAX),
    Description VARCHAR(MAX),
    Priority VARCHAR(20) NOT NULL,
    IssueId BIGINT UNIQUE NOT NULL,
    CreatedDate DATETIME NOT NULL,
    Status VARCHAR(20) NOT NULL,
    Remark VARCHAR(MAX),
    UserId VARCHAR(50) NOT NULL,
    RaisedBy VARCHAR(100) NOT NULL
);

--issues

INSERT INTO Issues
(Id, Title, Details, Description, Priority, IssueId, CreatedDate, Status, Remark, UserId, RaisedBy)
VALUES
('ISS001','Login Error','Unable to login','Users cannot login with valid credentials','High',1781673628431,'2026-06-17 06:00:00','Open','Investigating','6vHoFC4c1jw','Tharnish'),

('ISS002','Dashboard Update','Change dashboard colors','Need new UI theme','Low',1781673628432,'2026-06-17 06:10:00','In Progress','UI team working','EMP002','John'),

('ISS003','Profile Issue','Profile not updating','Changes are not saved','Medium',1781673628433,'2026-06-17 06:20:00','Open','Pending review','EMP003','Priya'),

('ISS004','Ticket Creation','Cannot raise ticket','Submit button not working','High',1781673628434,'2026-06-17 06:30:00','Open','Assigned to developer','EMP004','Arun'),

('ISS005','Search Bug','Search not working','Search returns all records','Medium',1781673628435,'2026-06-17 06:40:00','Closed','Fixed and tested','EMP005','Kumar'),

('ISS006','Mobile Layout','Responsive issue','Layout breaks on mobile devices','Low',1781673628436,'2026-06-17 06:50:00','In Progress','Under development','EMP006','Sneha'),

('ISS007','Filter Issue','Status filter broken','Filter returns incorrect records','Medium',1781673628437,'2026-06-17 07:00:00','Open','Analyzing logic','EMP007','Rahul'),

('ISS008','Remark Save','Remarks not saving','Admin remarks disappear after refresh','High',1781673628438,'2026-06-17 07:10:00','Open','Database check','EMP008','Meena'),

('ISS009','User Count','Count mismatch','Dashboard count differs from database','Low',1781673628439,'2026-06-17 07:20:00','Closed','Fixed query','EMP009','Vijay'),

('ISS010','Dashboard Cards','Wrong statistics','Cards display incorrect values','Medium',1781673628440,'2026-06-17 07:30:00','In Progress','Updating API','EMP010','Anu'),

('ISS011','Logout Issue','Logout not working','Session not cleared properly','High',1781673628441,'2026-06-17 07:40:00','Open','Authentication review','EMP011','Karthik'),

('ISS012','Registration Bug','Duplicate accounts','Duplicate account creation allowed','Medium',1781673628442,'2026-06-17 07:50:00','Closed','Validation added','EMP012','Divya'),

('ISS013','Table Sorting','Incorrect order','Sort order inconsistent','Low',1781673628443,'2026-06-17 08:00:00','Open','Pending fix','EMP013','Sanjay'),

('ISS014','Notification Issue','No alerts shown','Notifications fail to display','Medium',1781673628444,'2026-06-17 08:10:00','In Progress','Notification service check','EMP014','Ravi'),

('ISS015','Admin Login','Admin unable to login','Credentials rejected incorrectly','High',1781673628445,'2026-06-17 08:20:00','Open','Credentials verified','EMP015','Keerthi'),

('ISS016','Date Filter','Date range incorrect','Issues outside range displayed','Medium',1781673628446,'2026-06-17 08:30:00','Closed','Fixed comparison logic','EMP016','Hari'),

('ISS017','User Dashboard','Cards overlap','Dashboard cards overlap on tablets','Low',1781673628447,'2026-06-17 08:40:00','Open','CSS update pending','EMP017','Suresh'),

('ISS018','Issue Tracking','Status not updating','Issue status remains unchanged','High',1781673628448,'2026-06-17 08:50:00','In Progress','API debugging','EMP018','Deepa'),

('ISS019','Theme Issue','Dark mode broken','Some elements ignore dark theme','Low',1781673628449,'2026-06-17 09:00:00','Closed','Fixed styles','EMP019','Ajith'),

('ISS020','Ticket Details','Description missing','Issue description not displayed','Medium',1781673628450,'2026-06-17 09:10:00','Open','Investigating data binding','EMP020','Monika');

--searching for the user in login in  and checking duplicate email in registration 

--DECLARE @email VARCHAR(30)
--SET @email = 'tanya.bose@company.com'
--SELECT * FROM Users 
--WHERE email = @email 

-- for login 

--DECLARE @password VARCHAR(30) 
--SET @password = 'hashed_password_142' 
--SELECT * 
--FROM Users
--WHERE email = @email AND password = @password 

--fetching users issues 
--DECLARE @userid VARCHAR(20) 
--SET @userid = 'EMP002'

--SELECT * 
--FROM Issues
--WHERE UserId = @userid 


--fetching users Issues with filtering
--DECLARE @userid VARCHAR(20) 
--SET @userid = 'EMP002'
--DECLARE @priority varchar(30) = 'Low' 
--DECLARE @status VARCHAR(30) = 'In Progress' 


--SELECT * 
--FROM Issues
--WHERE UserId = @userid 
--AND Status = @status 
--AND Priority = @priority 


----updating details 
--DECLARE @newName VARCHAR(30) = 'NEW NAME' 
--DECLARE @newEMAIL VARCHAR(30) = 'NEW EMAIL'
--DECLARE @ID VARCHAR(30) = '4lw0sIqJaK4'

----UPDATE Users 
----SET name = @newEMAIL , email = @newEMAIL 
----WHERE id = @ID 

--SELECT * 
--FROM Users
--WHERE id = @ID



--SEARCH BY ISSUE 
--DECLARE @searchInput VARCHAR(40) = 'Issue' 

--SELECT * 
--FROM Issues
--WHERE Title LIKE '%' + @searchInput + '%'


--ADMIN LOGIN 
--DECLARE @email VARCHAR(30) = 'SAMPLE@gmail.com'
--DECLARE @password VARCHAR(30) 
--SET @password = 'hashed_password_142' 
--SELECT * 
--FROM Users
--WHERE email = @email AND password = @password AND role = 'ADMIN'


--FOR USERS 

SELECT * 
FROM Users

--FILTERING 
--DECLARE @department VARCHAR(30) = 'IT' 
--SELECT * FROM Users 
--WHERE department = @department

----FILTERING WITH NAME SEARCH 
--DECLARE @department VARCHAR(30) = 'IT' 
--DECLARE @searchInput VARCHAR(30) = 'Kumar'

--SELECT * FROM Users 
--WHERE department = @department AND name LIKE '%' + @searchInput + '%'


--DISPLAYING 5 RECENT ISSUES 
SELECT TOP(5) * FROM Issues 
ORDER BY CreatedDate DESC


--DATE FILTER IN ISSUES 
DECLARE @from DATE = '2026-06-10' 
DECLARE @to DATE = '2026-06-20' 

SELECT * 
FROM Issues
WHERE CreatedDate BETWEEN @from AND @to

--FILTERING 
DECLARE @priority VARCHAR(20) = 'High' 
DECLARE @status VARCHAR(20) = 'Open' 

SELECT * 
FROM Issues
WHERE Priority = @priority 
AND Status = @status 


--SEARCH BY TITLE 
DECLARE @title VARCHAR(30) = 'Error' 

SELECT * 
FROM Issues
WHERE Title LIKE '%' + @title + '%' 



--view to see issues of specific user
CREATE VIEW vw_UserIssues AS
SELECT
    i.IssueId,
    i.Title,
    i.Description,
    i.Priority,
    i.Status,
    u.UserId,
    u.Name
FROM Issues i
JOIN Users u
ON i.UserId = u.UserId;


--view to get high priority open issues
CREATE VIEW vw_OpenIssues AS
SELECT *
FROM Issues
WHERE Status = 'Open' AND Priority = 'High';


--view to get statistics
CREATE VIEW vw_IssueStatistics AS
SELECT
    COUNT(*) AS TotalIssues,
    SUM(CASE WHEN Status = 'Open' THEN 1 ELSE 0 END) AS OpenIssues,
    SUM(CASE WHEN Status = 'In Progress' THEN 1 ELSE 0 END) AS InProgressIssues,
    SUM(CASE WHEN Status = 'Closed' THEN 1 ELSE 0 END) AS ClosedIssues
FROM Issues;


-- index on email for optimized login experience 
CREATE UNIQUE INDEX IX_Users_Email
ON Users(Email);


--query optimization
CREATE INDEX IX_Issues_UserId_Status
ON Issues(UserId, Status);