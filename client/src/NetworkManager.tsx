import {useLayoutEffect} from 'react';
import { AxiosResponse } from "axios";
import axiosInstance from './axiosInstance';
import { toast } from 'react-toastify';
import { useAppDispatch } from './redux/hooks';
import { logout } from './redux/authSlice';
export default function NetworkManager({children}:{children:any}) {
    const dispatch = useAppDispatch()
    useLayoutEffect(()=>{
        axiosInstance.interceptors.response.use(
            (res: AxiosResponse) => res,
            async (error: Error & { response: AxiosResponse }) => {
              if (error.response && error.response.status === 401) {
                toast.error('משתמש לא רשום');
                dispatch(logout())         
              }
            }
          );
        },[dispatch])
  return (
    <>
    {children}
    </>
  )
}
