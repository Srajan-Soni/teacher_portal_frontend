import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { GET_STUDENTS, ADD_STUDENTS, EDIT_STUDENTS, DELETE_STUDENT } from '../../API/apiRoutes';
import axiosInstance from '../../utils/axiosConfig';

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (teacherId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(GET_STUDENTS, { teacherId });
      return response.data.studentData;
    } catch (error) {
      return rejectWithValue('Failed to fetch students');
    }
  }
);

export const addStudent = createAsyncThunk(
  'students/addStudent',
  async (studentData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(ADD_STUDENTS, studentData);
      return response.data.student;
    } catch (error) {
      return rejectWithValue('Failed to add student');
    }
  }
);

export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async ({ studentId, updatedData }, { rejectWithValue }) => {
    try {
      await axiosInstance.put(`${EDIT_STUDENTS}/${studentId}`, updatedData);
      return { studentId, updatedData };
    } catch (error) {
      return rejectWithValue('Failed to update student');
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (studentId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${DELETE_STUDENT}/${studentId}`);
      return studentId;
    } catch (error) {
      return rejectWithValue('Failed to delete student');
    }
  }
);



const studentSlice = createSlice({
  name: 'students',
  initialState: {
    students: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {

    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(updateStudent.fulfilled, (state, action) => {
        const { studentId, updatedData } = action.payload;
        state.students = state.students.map((student) =>
          student._id === studentId ? { ...student, ...updatedData } : student
        );
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.error = action.payload;
      })


      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter((student) => student._id !== action.payload);
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default studentSlice.reducer;
