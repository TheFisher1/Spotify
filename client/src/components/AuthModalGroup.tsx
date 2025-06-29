import { useAuth } from "../contexts/AuthContext";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";

export function AuthModalGroup() {
    const {
        isLoginModalOpen,
        isRegisterModalOpen,
        closeLoginModal,
        closeRegisterModal,
        switchToRegister,
        switchToLogin
    } = useAuth();

    return (
        <>
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={closeLoginModal}
                onSwitchToRegister={switchToRegister}
            />

            <RegisterModal
                isOpen={isRegisterModalOpen}
                onClose={closeRegisterModal}
                onSwitchToLogin={switchToLogin}
            />
        </>
    );
}