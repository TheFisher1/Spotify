import Button from './Button';

interface LogoutButtonProps {
  readonly onLogout: () => void;
}

export function LogoutButton({ onLogout }: LogoutButtonProps) {
  return (
    <Button onClick={onLogout} variant="secondary" size="md">
      Logout
    </Button>
  );
}
