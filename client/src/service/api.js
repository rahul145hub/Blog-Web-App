import axios from 'axios'
import { getAccessToken } from '../utils/common-utils'
const URL = '';

export const createUser = async (data) => {
   try {
      let res = await axios.post(`${URL}/signup`, data);
      return res;
   } catch (error) {
      return error.response;
   }

}

export const loginUser = async (data) => {
   try {
      let res = await axios.post(`${URL}/login`, data);
      return res;
   } catch (error) {
      return error.response;
   }

}

export const blogPost = async (data) => {
   try {
      let res = await axios.post(`${URL}/create`, data, {
         headers: {
            'authorization': getAccessToken()
         }
      });
      return res;
   } catch (error) {
      return error.response;
   }

}

export const readPosts = async (category) => {
   try {
      let res = await axios.get(`${URL}/posts?category=${category}`, {
         headers: {
            'authorization': getAccessToken()
         }
      });
      return res;
   } catch (error) {
      return error.response;
   }

}

export const readPost = async (id) => {
   try {
      let res = await axios.get(`${URL}/post/${id}`, {
         headers: {
            'authorization': getAccessToken()
         }
      });
      return res;
   } catch (error) {
      return error.response;
   }

}

export const deletePost = async (id) => {
   try {
      let res = await axios.delete(`${URL}/delete/${id}`, {
         headers: {
            'authorization': getAccessToken()
         }
      });
      return res;
   } catch (error) {
      return error.response;
   }
}

export const blogUpdate = async (data, id) => {
   try {
      let res = await axios.put(`${URL}/update/${id}`, data, {
         headers: {
            'authorization': getAccessToken()
         }
      });
      return res;
   } catch (error) {
      return error.response;
   }

}


export const fileUpload = async (data) => {
   try {
      let res = await axios.post(`${URL}/file/upload`, data);
      return res.data;
   } catch (error) {
      return error.response;
   }

}