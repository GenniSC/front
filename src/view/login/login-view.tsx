import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { useRouter } from "../../routes/hooks";
import { LoginForm } from "./login-form";
import { Footer } from "../../components/footer/footer";

export function LoginView() {
  const router = useRouter();
  const { expires } = useContext(AuthContext);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (expires && expires > new Date()) {
      router.push("/");
    }
  }, [expires, router]);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom right, #71AF8D, #00796b)",
        overflow: "auto",
        padding: 2,
      }}
    >
      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        alignItems="center"
        justifyContent="center"
        sx={{ width: isMobile ? "100%" : "auto" }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: isMobile ? 2 : 0,
            marginRight: isMobile ? 0 : 20,
          }}
        >
          <img
            src="/src/assets/logo.svg"
            alt="FindBus Logo"
            style={{
              width: isMobile ? 120 : 500,
              height: isMobile ? 120 : 500,
            }}
          />
        </Box>

        {/* Formulário de Login */}
        <LoginForm />
      </Box>

      {/* Snackbar para feedback de erro */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Falha no login. Verifique suas credenciais.
        </Alert>
      </Snackbar>

      {/* Rodapé */}
      <Footer />
    </Box>
  );
}
