import { useState } from "react";
import {
  Visibility,
  VisibilityOff,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import {
  Box,
  Card,
  Grid,
  Button,
  Divider,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Container,
  Snackbar,
} from "@mui/material";
import { Header } from "../home/header";
import { Footer } from "../../components/footer";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "../../components/modal";

export default function PerfilView() {
  const navigate = useNavigate();

  const [editSection, setEditSection] = useState<string | null>(null);
  const [perfil, setPerfil] = useState({ nome: "", email: "" });
  const [senha, setSenha] = useState({ nova: "", confirmar: "" });
  const [errors, setErrors] = useState<{
    nome?: string;
    email?: string;
    nova?: string;
    confirmar?: string;
  }>({});

  const [showNovaSenha, setShowNovaSenha] = useState<boolean>(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState<boolean>(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [confirmSavePerfilOpen, setConfirmSavePerfilOpen] = useState(false);
  const [confirmSaveSenhaOpen, setConfirmSaveSenhaOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const toggleSection = (section: string | null) => {
    setEditSection(editSection === section ? null : section);
  };

  const handlePerfilChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  const handleSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenha({ ...senha, [e.target.name]: e.target.value });
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    // Aqui você adicionaria a lógica para deletar a conta do usuário
    console.log("Conta deletada");
    setSnackbarMessage("Conta excluída com sucesso.");
    setSnackbarOpen(true);
    setDeleteModalOpen(false);
    setTimeout(() => navigate("/"), 2000);
  };

  const validatePerfil = () => {
    const newErrors: any = {};
    if (!perfil.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!perfil.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(perfil.email)) {
      newErrors.email = "Email inválido";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSenha = () => {
    const newErrors: any = {};
    if (!senha.nova) newErrors.nova = "Nova senha é obrigatória";
    if (!senha.confirmar)
      newErrors.confirmar = "Confirmação da senha é obrigatória";
    if (senha.nova && senha.confirmar && senha.nova !== senha.confirmar) {
      newErrors.confirmar = "As senhas não correspondem";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSalvarPerfil = () => {
    if (validatePerfil()) {
      setConfirmSavePerfilOpen(true);
    }
  };

  const handleConfirmSavePerfil = () => {
    console.log("Perfil salvo:", perfil);
    setSnackbarMessage("Perfil atualizado com sucesso.");
    setSnackbarOpen(true);
    setEditSection(null);
    setConfirmSavePerfilOpen(false);
  };

  const handleSalvarSenha = () => {
    if (validateSenha()) {
      setConfirmSaveSenhaOpen(true);
    }
  };

  const handleConfirmSaveSenha = () => {
    console.log("Senha salva:", senha);
    setSnackbarMessage("Senha atualizada com sucesso.");
    setSnackbarOpen(true);
    setEditSection(null);
    setConfirmSaveSenhaOpen(false);
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header showProfileButton={false} />
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          mt: 8, // Ajuste para evitar sobreposição com o Header fixo
        }}
      >
        <Box mb={2}>
          <Typography variant="h5" gutterBottom>
            Seu Perfil
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Abaixo estão suas configurações
          </Typography>
        </Box>

        <Divider />

        <Card sx={{ mt: 3, p: 3, borderRadius: 2, boxShadow: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ p: 2, borderRadius: 2, boxShadow: 2 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  onClick={() => toggleSection("perfil")}
                  sx={{ cursor: "pointer" }}
                >
                  <Typography variant="h6">Editar Perfil</Typography>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSection("perfil");
                    }}
                  >
                    <ExpandMoreIcon
                      sx={{
                        transform:
                          editSection === "perfil"
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        transition: "transform 0.3s",
                      }}
                    />
                  </IconButton>
                </Box>
                {editSection === "perfil" && (
                  <Box mt={2}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Nome"
                          name="nome"
                          variant="outlined"
                          value={perfil.nome}
                          onChange={handlePerfilChange}
                          error={!!errors.nome}
                          helperText={errors.nome}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          variant="outlined"
                          value={perfil.email}
                          onChange={handlePerfilChange}
                          error={!!errors.email}
                          helperText={errors.email}
                        />
                      </Grid>
                    </Grid>
                    <Box mt={3} display="flex" justifyContent="flex-end">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSalvarPerfil}
                      >
                        Salvar
                      </Button>
                    </Box>
                  </Box>
                )}
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ p: 2, borderRadius: 2, boxShadow: 2 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  onClick={() => toggleSection("senha")}
                  sx={{ cursor: "pointer" }}
                >
                  <Typography variant="h6">Alterar Senha</Typography>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSection("senha");
                    }}
                  >
                    <ExpandMoreIcon
                      sx={{
                        transform:
                          editSection === "senha"
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        transition: "transform 0.3s",
                      }}
                    />
                  </IconButton>
                </Box>
                {editSection === "senha" && (
                  <Box mt={2}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Nova Senha"
                          name="nova"
                          type={showNovaSenha ? "text" : "password"}
                          variant="outlined"
                          value={senha.nova}
                          onChange={handleSenhaChange}
                          error={!!errors.nova}
                          helperText={errors.nova}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    setShowNovaSenha(!showNovaSenha)
                                  }
                                >
                                  {showNovaSenha ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Confirmar Nova Senha"
                          name="confirmar"
                          type={showConfirmarSenha ? "text" : "password"}
                          variant="outlined"
                          value={senha.confirmar}
                          onChange={handleSenhaChange}
                          error={!!errors.confirmar}
                          helperText={errors.confirmar}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    setShowConfirmarSenha(!showConfirmarSenha)
                                  }
                                >
                                  {showConfirmarSenha ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Box mt={3} display="flex" justifyContent="flex-end">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSalvarSenha}
                      >
                        Salvar
                      </Button>
                    </Box>
                  </Box>
                )}
              </Card>
            </Grid>
          </Grid>
        </Card>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleDelete} variant="contained" color="error">
            Excluir conta
          </Button>
          <Button onClick={() => navigate(-1)} variant="contained">
            Sair
          </Button>
        </Box>
      </Container>
      <Footer />

      {/* Modal de Confirmação para Exclusão de Conta */}
      <ConfirmModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Confirmar exclusão"
        description="Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita."
      />

      {/* Modal de Confirmação para Salvar Perfil */}
      <ConfirmModal
        open={confirmSavePerfilOpen}
        onClose={() => setConfirmSavePerfilOpen(false)}
        onConfirm={handleConfirmSavePerfil}
        title="Confirmar alterações"
        description="Deseja salvar as alterações no seu perfil?"
      />

      {/* Modal de Confirmação para Salvar Senha */}
      <ConfirmModal
        open={confirmSaveSenhaOpen}
        onClose={() => setConfirmSaveSenhaOpen(false)}
        onConfirm={handleConfirmSaveSenha}
        title="Confirmar alterações"
        description="Deseja salvar a nova senha?"
      />

      {/* Snackbar para mensagens */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <Button color="inherit" size="small" onClick={handleSnackbarClose}>
            Fechar
          </Button>
        }
      />
    </Box>
  );
}
