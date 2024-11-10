import { Box, Card, TextField, Button, Typography } from "@mui/material";
import { Footer } from "../../../components/footer";
import { MapComponent } from "../../../components/map";
import { Header } from "../header";

export default function HomePage() {
  const HEADER_HEIGHT = 64; // Altura estimada do Header
  const FOOTER_HEIGHT = 64; // Altura estimada do Footer

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        paddingTop: `${HEADER_HEIGHT}px`,
        paddingBottom: `${FOOTER_HEIGHT}px`,
      }}
    >
      {/* Header */}
      <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <Header />
      </Box>

      {/* Conteúdo Principal */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          flexGrow: 1,
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 2,
          mt: 2,
        }}
      >
        {/* Card de Sobre Nós */}
        <Card
          sx={{
            width: { xs: "100%", md: "30%" },
            padding: 3,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Sobre Nós
          </Typography>
          <Typography variant="body1">
            Somos uma empresa dedicada a oferecer soluções inovadoras para
            nossos clientes. Nossa missão é entregar qualidade e excelência em
            todos os projetos que desenvolvemos. Com uma equipe experiente e
            apaixonada, estamos prontos para ajudar você a alcançar seus
            objetivos.
          </Typography>
        </Card>
        {/* Card do Mapa */}
        <Card
          sx={{
            width: { xs: "100%", md: "60%" },
            padding: 3,
            boxShadow: 3,
          }}
        >
          <MapComponent />
        </Card>
      </Box>

      {/* Formulário de Contato */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          gap: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Entre em Contato
        </Typography>
        <Card
          sx={{
            width: { xs: "100%", md: "60%" },
            padding: 3,
            boxShadow: 3,
          }}
        >
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
            noValidate
            autoComplete="off"
          >
            <TextField label="Nome" variant="outlined" fullWidth required />
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              required
            />
            <TextField
              label="Mensagem"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              required
            />
            <Button variant="contained" color="primary">
              Enviar
            </Button>
          </Box>
        </Card>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
}
