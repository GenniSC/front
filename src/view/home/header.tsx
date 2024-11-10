import { Box, Link, Typography } from "@mui/material";
import { Logo } from "../../components/logo";

export function Header() {
  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        width: "100%",
        bgcolor: "#00695f",
        color: "white",
        padding: "8px 16px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "100%",
        }}
      >
        {/* Logo e Título */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Logo sx={{ width: 100, height: 60, mt: 1 }} />
          <Link href="/" underline="none" color="inherit">
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              FindBus
            </Typography>
          </Link>
        </Box>

        {/* Links */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Link href="/about" underline="hover" color="inherit">
            <Typography variant="body1">About</Typography>
          </Link>
          <Link href="/contact" underline="hover" color="inherit">
            <Typography variant="body1">Contact</Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
