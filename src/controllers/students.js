import { StudentsCollection } from '../db/models/students.js';
import { getAllStudents, getStudentById } from '../services/students.js';
import createHttpError from 'http-errors';
export const getStudentsController = async (req, res, next) => {
  try {
    const students = await getAllStudents();

    res.json({
      status: 200,
      message: 'Successfully found students!',
      data: students,
    });
  } catch (err) {
    next(err);
  }
};
export const getStudentByIdController = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await getStudentById(studentId);
  if (!student) {
    throw createHttpError(404, 'Student not found');
  }
  res.json({
    status: 200,
    message: `Successfully found student with id ${studentId}!`,
    data: student,
  });
};
export const createStudentController = async (req, res, next) => {
  try {
    const { name, age, gender, avgMark, onDuty } = req.body;

    if (!name || !age || !gender || avgMark === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newStudent = await StudentsCollection.create({
      name,
      age,
      gender,
      avgMark,
      onDuty,
    });

    res.status(201).json({
      status: 201,
      message: 'Student successfully created!',
      data: newStudent,
    });
  } catch (err) {
    next(err);
  }
};
