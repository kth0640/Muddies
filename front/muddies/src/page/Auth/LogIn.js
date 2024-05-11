import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const naviate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        // FormData 객체 생성
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        axios.post('http://localhost:8080/login', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((res) => {
            if (res.status === 200) {
                const token = res.headers.authorization.split(' ')[1];
                // 받은 토큰을 로컬 스토리지에 저장
                localStorage.setItem('token', token);
                // 로그인 후에 홈페이지로 리다이렉트 또는 홈페이지에서의 처리를 여기서 수행
                naviate('/'); // 홈페이지로 리다이렉트
            } else {
                // 로그인 실패 시 에러 처리
                console.error('로그인 실패');
            }
        }).catch((error) => {
            console.error('오류 발생:', error);
        });
    }

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-10">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">로그인</h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">사용자 이름</label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="text" required="" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호</label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="password" required="" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">로그인</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            아직 계정이 없나요? <Link to={"/signup"} className="hover:underline text-blue-600">회원 가입</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LogIn;