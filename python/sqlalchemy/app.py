import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy import create_engine


engine = create_engine('sqlite:///:memory:')


# Define classes
Base = declarative_base()

class Enrollment(Base):
    __tablename__ = 'enrollment'

    student_id = Column(Integer, ForeignKey('student.id'), primary_key=True)
    course_id = Column(Integer, ForeignKey('course.id'), primary_key=True)
    course = relationship('Course', back_populates='students')
    student = relationship('Student', back_populates='courses')

class Course(Base):
    __tablename__ = 'course'
    id = Column(String, primary_key=True)
    name = Column(String(250))
    students = relationship('Enrollment', back_populates="course")

class Student(Base):
    __tablename__ = 'student'
    id = Column(String, primary_key=True)
    name = Column(String(250), nullable=False)
    courses = relationship('Enrollment', back_populates="student")
    

# Create tables
Base.metadata.create_all(engine)

# Insert data
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

course = Course(id='MBI11111', name='scripting')
session.add(course)

student = Student(id='r0000000', name='Adam')
session.add(student)

enrollment = Enrollment()
enrollment.student = student
course.students.append(enrollment)
session.add(enrollment)

session.commit()




# Query data
for course in session.query(Course):
    print(course.name)

    for enrollment in course.students:
        print(f"  {enrollment.student.name} ({enrollment.student.id})")
