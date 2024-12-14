import { Button, notification } from "antd"
import { FcGoogle } from "react-icons/fc"

const LoginSocial = () => {
    const handleLoginGoogle = () => {
        notification.info({
            message: "InFo",
            description: "Will update as soon as possible"
        })
    }
    return (
        <>
            <Button
                icon={<FcGoogle size={30} />}
                className="mb-3"
                style={{
                    width: "100%",
                    height: "36px"
                }}
                onClick={handleLoginGoogle}
            >
                Login with Google
            </Button>
        </>
    )
}

export default LoginSocial