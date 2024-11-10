import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { RegisterForm } from "./cadastro-form";
import { Footer } from "../../components/footer/footer";

export function RegisterView() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        <RegisterForm />
      </Box>

      <Footer />
    </Box>
  );
}
