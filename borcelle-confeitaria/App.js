import React, { useState } from 'react';  // Importa o React e a função useState do pacote 'react'
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, FlatList, Modal } from 'react-native';  // Importa os componentes necessários do pacote 'react-native'

// Componente de menu lateral
const Menu = ({ onLogout, navigateToAbout }) => (
  <View style={styles.menu}>
    <TouchableOpacity onPress={navigateToAbout} style={styles.menuItem}>
      <Text style={styles.menuText}>Sobre</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onLogout} style={styles.menuItem}>
      <Text style={styles.menuText}>Logout</Text>
    </TouchableOpacity>
  </View>
);

// Componente do ícone de menu hamburguer
const HamburgerMenu = ({ onToggleMenu }) => (
  <TouchableOpacity onPress={onToggleMenu} style={styles.hamburger}>
    <Text style={styles.hamburgerIcon}>☰</Text>
  </TouchableOpacity>
);

// Componente da tela de login
const LoginScreen = ({ navigate, toggleMenu }) => {
  // Estados para armazenar informações do usuário e mensagens
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Função para lidar com o login
  const handleLogin = () => {
    if (!username || !password) {
      setShowModal(true);
    } else {
      console.log('Username:', username);
      console.log('Password:', password);
      setMessage('Login efetuado com sucesso!');
      navigate('Home');
    }
  };

  // Função para lidar com a criação de conta
  const handleCreateAccount = () => {
    if (!username || !password || !confirmPassword) {
      setShowModal(true);
    } else {
      console.log('Username:', username);
      console.log('Password:', password);
      console.log('Confirm Password:', confirmPassword);
      setMessage('Sua conta foi criada com sucesso!');
      setIsCreatingAccount(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={{ uri: 'https://marketplace.canva.com/EAFXp0T7QOw/1/0/800w/canva-logo-para-confeitaria-simples-rosa-gOoglU69_YA.jpg' }} style={styles.logo} />
      <View>
        {/* Título da tela */}
        <Text style={styles.title}>{isCreatingAccount ? 'Criar Conta' : 'Login'}</Text>
        {/* Inputs para o username e a senha */}
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={text => setUsername(text)}
          placeholder="Username"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Password"
          secureTextEntry={true}
        />
        {/* Input adicional para confirmar a senha, caso esteja criando uma conta */}
        {isCreatingAccount && (
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            placeholder="Confirm Password"
            secureTextEntry={true}
          />
        )}
        {/* Botão para login ou criar conta, dependendo do estado atual */}
        {isCreatingAccount ? (
          <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
            <Text style={styles.buttonText}>Criar Conta</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        )}
        {/* Botão para alternar entre login e criação de conta */}
        <Text style={styles.toggleButton} onPress={() => setIsCreatingAccount(!isCreatingAccount)}>
          {isCreatingAccount ? 'Já tem uma conta? Faça login!' : 'Não tem uma conta? Crie agora!'}
        </Text>
        {/* Mensagem de feedback para o usuário */}
        {message !== '' && (
          <Text style={styles.message}>{message}</Text>
        )}
      </View>
      {/* Modal para alertar o usuário sobre campos vazios */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Atenção, preencha todos os campos!</Text>
            <Button title="OK" onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Componente da tela inicial (Home)
const HomeScreen = ({ navigate, toggleMenu }) => {
  // Lista de produtos
  const products = [
    { id: '1', name: 'Bolo de Chocolate', description: 'Delicioso bolo de chocolate feito com ingredientes frescos.', image: 'https://th.bing.com/th/id/OIP.1UfEDnXLF_BitoO4juQiswHaFT?rs=1&pid=ImgDetMain', price: 'R$ 40,00' },
    { id: '2', name: 'Cupcake Decorado', description: 'Cupcake decorado à mão com cobertura de buttercream.', image: 'https://1.bp.blogspot.com/-27ZcE6m_sEw/V9Y-mvUNj8I/AAAAAAAAcK0/BLy3lrWT-EYfMUxrC-WVoQpKy0HmRxKxACLcB/s1600/chocolate_cupcakes_raspberry_buttercream6...jpg', price: 'R$ 10,00' },
    { id: '3', name: 'Torta de Frutas', description: 'Torta de frutas frescas com uma crosta de massa folhada.', image: 'https://th.bing.com/th/id/R.2af67a3ae47de85b91e6b6e6c358334a?rik=3skez0hZOFo%2bLg&pid=ImgRaw&r=0', price: 'R$ 60,00' },
    { id: '4', name: 'Cookies de Chocolate', description: 'Cookies macios e crocantes, repletos de pedaços de chocolate.', image: 'https://th.bing.com/th/id/OIP.prjPcxGstTDlm5oboM5wzAHaIN?rs=1&pid=ImgDetMain', price: 'R$ 10,00' },
  ];

  // Função para renderizar cada item de produto na lista
  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productItem} onPress={() => navigate('ProductDetails', { product: item })}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Ícone do menu hamburguer */}
      <HamburgerMenu onToggleMenu={toggleMenu} />
      {/* Logo */}
      <Image source={{ uri: 'https://marketplace.canva.com/EAFXp0T7QOw/1/0/800w/canva-logo-para-confeitaria-simples-rosa-gOoglU69_YA.jpg' }} style={styles.logo} />
      {/* Lista de produtos */}
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

// Componente da tela de detalhes do produto
const ProductDetailsScreen = ({ route, navigate }) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
      <Button title="Voltar" onPress={() => navigate('Home')} />
    </View>
  );
};

// Componente da tela "Sobre"
const AboutScreen = ({ navigate }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre</Text>
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutText}>
          Borcelle Confeitaria é um lugar mágico onde os sabores se encontram com a criatividade. Fundada por Alanna, nossa confeitaria nasceu com o intuito de alegrar a vida dos nossos clientes. Com bolos decorados de todos os temas e doces feitos com muito amor, a Borcelle é um verdadeiro paraíso para os amantes de confeitaria. Cada criação é uma obra de arte comestível, e cada mordida é uma explosão de felicidade. Venha nos visitar e deixe-se encantar pela doçura da Borcelle!” 🍰🎂
        </Text>
      </View>
      <Button title="Voltar" onPress={() => navigate('Home')} style={styles.backButton} />
    </View>
  );
};

// Componente principal do aplicativo
const App = () => {
  // Estados para controlar a tela atual e o menu lateral
  const [currentScreen, setCurrentScreen] = useState('Login');
  const [currentParams, setCurrentParams] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para navegar entre telas
  const navigate = (screen, params = null) => {
    setCurrentScreen(screen);
    setCurrentParams(params);
    setIsMenuOpen(false); // Fecha o menu ao navegar para outra tela
  };

  // Função para abrir/fechar o menu lateral
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Função para fazer logout
  const logout = () => {
    navigate('Login');
  };

  // Função para navegar para a tela "Sobre"
  const navigateToAbout = () => {
    setCurrentScreen('About');
    setIsMenuOpen(false);
  };

  // Variável para armazenar o componente da tela atual com base no estado atual
  let ScreenComponent;

  switch (currentScreen) {
    case 'Home':
      ScreenComponent = HomeScreen;
      break;
    case 'ProductDetails':
      ScreenComponent = ProductDetailsScreen;
      break;
    case 'About':
      ScreenComponent = AboutScreen;
      break;
    case 'Login':
    default:
      ScreenComponent = LoginScreen;
      break;
  }

  return (
    <View style={styles.container}>
      {/* Renderiza o componente da tela atual */}
      <ScreenComponent navigate={navigate} toggleMenu={toggleMenu} route={{ params: currentParams }} />
      {/* Renderiza o menu lateral se estiver aberto */}
      {isMenuOpen && <Menu onLogout={logout} navigateToAbout={navigateToAbout} />}
    </View>
  );
};

// Estilos do aplicativo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFCED6',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Arial',
    color: '#FF69B4',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  toggleButton: {
    marginTop: 20,
    color: '#000',
    textAlign: 'center',
  },
  message: {
    marginTop: 20,
    color: '#FF69B4',
    fontSize: 16,
    textAlign: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 60,
    marginBottom: 30,
    alignSelf: 'center',
  },
  homeLogo: {
    width: 75,
    height: 75,
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 16,
    color: '#888',
    marginTop: 30,
  },
  productPrice: {
    fontSize: 18,
    color: '#00C',
    marginTop: 35,
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '80%',
    height: '100%',
    backgroundColor: '#E85CA2',
    padding: 10,
    borderWidth: 1,
    borderColor: '#FFCED6',
  },
  menuItem: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },
  hamburger: {
    position: 'absolute',
    top: 70,
    left: 20,
    zIndex: 1,
  },
  hamburgerIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuText: {
    fontSize: 18,
    marginTop: 50,
    color: '#FFF',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFCED6',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FF69B4', // Cor alterada de azul para rosa
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    width: '100%',
    marginTop: 40,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  productList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  aboutContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    marginTop: 70,
    marginBottom: 40,
    alignSelf: 'stretch',
  },
  aboutText: {
    fontSize: 16,
    textAlign: 'justify',
    color: '#333',
  },
  backButton: {
    backgroundColor: '#FF69B4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    width: '100%',
    marginTop: 20,
  },
});

export default App;
