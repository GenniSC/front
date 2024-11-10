import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Iconify } from "../../components/iconify";
import { AuthContext } from "../../contexts/auth";
import { useRouter } from "../../routes/hooks";
import { useNavigate } from "react-router-dom";

export function RegisterForm() {
  const router = useRouter();
  const navigate = useNavigate();

  const { signUp } = useContext(AuthContext);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      await signUp(name, email, password);
      setSuccess(true);
      setError(null);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setError("Falha no cadastro. Verifique suas informações.");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleRegister();
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
        Cadastro
      </Typography>

      <TextField
        fullWidth
        label="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyPress={handleKeyPress}
        error={Boolean(error)}
        helperText={error && "Por favor, insira um nome válido."}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />

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
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Confirme a Senha"
        type={showPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        onKeyPress={handleKeyPress}
        error={Boolean(error)}
        helperText={error && "As senhas não coincidem."}
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
        onClick={handleRegister}
        disabled={!name || !email || !password || !confirmPassword}
        sx={{ transition: "all 0.3s ease-in-out" }}
      >
        Cadastrar
      </LoadingButton>

      <Link
        href="#"
        onClick={() => navigate("/login")}
        sx={{
          mt: 2,
          fontSize: 14,
          color: "primary.main",
          textDecoration: "none",
          "&:hover": { textDecoration: "underline" },
        }}
      >
        Já tem uma conta? Faça login
      </Link>

      {/* Snackbar para feedback de sucesso */}
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Cadastro realizado com sucesso!
        </Alert>
      </Snackbar>

      {/* Snackbar para feedback de erro */}
      {error && (
        <Snackbar
          open={Boolean(error)}
          autoHideDuration={6000}
          onClose={() => setError(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setError(null)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}
