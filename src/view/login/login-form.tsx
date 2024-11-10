import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import { Iconify } from "../../components/iconify";
import { AuthContext } from "../../contexts/auth";
import { useRouter } from "../../routes/hooks";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const router = useRouter();
  const navigate = useNavigate();

  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      router.push("/");
    } catch (err) {
      setError("Falha no login. Verifique suas credenciais.");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        width: "100%",
        maxWidth: 400,
        padding: 4,
        backgroundColor: "white",
        borderRadius: 3,
        boxShadow: 6,
      }}
    >
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
        Login
      </Typography>

      <TextField
        fullWidth
        label="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyPress={handleKeyPress}
        error={Boolean(error)}
        helperText={error && "Por favor, insira um e-mail válido."}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Senha"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={handleKeyPress}
        error={Boolean(error)}
        helperText={error && "Por favor, insira uma senha válida."}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                <Iconify
                  icon={
                    showPassword ? "solar:eye-bold" : "solar:eye-closed-bold"
                  }
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      <LoadingButton
        fullWidth
        size="large"
        color="primary"
        variant="contained"
        onClick={handleLogin}
        disabled={!email || !password}
        sx={{ transition: "all 0.3s ease-in-out" }}
      >
        Entrar
      </LoadingButton>

      <Link
        href="#"
        onClick={() => navigate("/cadastro")}
        sx={{
          mt: 2,
          fontSize: 14,
          color: "primary.main",
          textDecoration: "none",
          "&:hover": { textDecoration: "underline" },
        }}
      >
        Não tem uma conta? Cadastre-se
      </Link>
    </Box>
  );
}
