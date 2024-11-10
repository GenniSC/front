import { Box, Card } from "@mui/material";
import { Footer } from "../../../components/footer";
import { MapComponent } from "../../../components/map";
import { Header } from "../header";

export default function HomePage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Header */}
      <Box>
        <Header />
      </Box>

      {/* Conteúdo Principal */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
        }}
      >
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

      {/* Footer */}
      <Box sx={{ mt: "auto" }}>
        <Footer />
      </Box>
    </Box>
  );
}
