import { StudentsCollection } from '../db/models/students.js';

export const getAllStudents = async () => {
  return await StudentsCollection.find();
};

export const getStudentById = async (studentId) => {
  return await StudentsCollection.findById(studentId);
};
