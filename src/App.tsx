import { useEffect } from 'react';
import { useAppDispatch } from './redux/hook'
import Router from './routers/Router'
import "@/styles/App.css"
import { callGetAccount } from './apis/api';
import { doGetAccountAction } from './redux/reducers/auth.reducer';

function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    getAccount()
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
  }

  return (
    <>
      <Router />
    </>
  )
}

export default App
