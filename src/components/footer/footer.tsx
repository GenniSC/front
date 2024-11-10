import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export function Footer() {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        textAlign: "center",
        padding: 2,
        bgcolor: "#004d40",
        color: "white",
      }}
    >
      <Typography variant="caption">
        © 2024 FindBus. Todos os direitos reservados.
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Link href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>
          Termos de Uso
        </Link>
        <Link href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>
          Política de Privacidade
        </Link>
        <Link href="#" color="inherit" underline="hover" sx={{ mx: 1 }}>
          Contato
        </Link>
      </Box>
    </Box>
  );
}
