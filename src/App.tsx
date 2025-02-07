import { useEffect, useRef } from 'react';
import { useAppDispatch } from './redux/hook'
import Router from './routers/Router'
import "@/styles/App.css"
import "@/styles/Responsive.css"
import { callGetAccount, callGetCategories, callGetUserCart } from './apis/api';
import { doGetAccountAction } from './redux/reducers/auth.reducer';
import { doGetCart } from './redux/reducers/cart.reducer';
import { doGetCategories } from './redux/reducers/generalSettings.reducer';

function App() {

  const dispatch = useAppDispatch();
  const hasFetch = useRef(false);

  useEffect(() => {
    if (!hasFetch.current) {
      getAccount()
      getCategories()
      hasFetch.current = true;
    }
  }, []);

  const getAccount = async () => {
    if (window.location.pathname === "/login" ||
      window.location.pathname === "/sign-up" ||
      window.location.pathname === "/forgot-password"
    ) return
    const res = await callGetAccount();
    if (res.data) {
      dispatch(doGetAccountAction(res.data));
    }
    const resCart = await callGetUserCart(res.data?._id);
    if (resCart.data) {
      dispatch(doGetCart(resCart.data));
    }
  }

  const getCategories = async () => {
    try {
      const res = await callGetCategories();
      if (res.data) {
        dispatch(doGetCategories(res.data.result));
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Router />
    </>
  )
}

export default App
