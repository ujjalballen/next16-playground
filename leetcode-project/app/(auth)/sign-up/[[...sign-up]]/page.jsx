export default function SignUpPage() {

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 px-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8">
                <div className="flex flex-col items-center">
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" /></svg>                    </div>

                    <h1 className="text-2xl font-semibold text-gray-800 text-center">
                        Sign up
                    </h1>
                    <p className="text-sm text-gray-500 text-center mt-2">
                        Continue with your Google account to get started
                    </p>
                </div>

                <button
                    className="mt-8 w-full flex items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:shadow-md active:scale-[0.98] transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" /></svg> Continue with Google
                </button>

                <p className="text-xs text-gray-400 text-center mt-6 leading-relaxed">
                    By continuing, you agree to our{' '}
                    <span className="text-blue-600 cursor-pointer hover:underline">
                        Terms of Service
                    </span>{' '}
                    and{' '}
                    <span className="text-blue-600 cursor-pointer hover:underline">
                        Privacy Policy
                    </span>.
                </p>
            </div>
        </div>
    )
}