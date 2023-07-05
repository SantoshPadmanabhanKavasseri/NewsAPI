
// Sample data
let users = [];
let preferences = {};
let news = [];

// POST /register
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Check if user already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'Username already taken' });
  }

  // Create new user
  const newUser = { username, password };
  users.push(newUser);
  return res.status(201).json({ message: 'User registered successfully' });
});

// POST /login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Check if user exists and credentials are valid
  const existingUser = users.find(user => user.username === username && user.password === password);
  if (!existingUser) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  return res.status(200).json({ message: 'Login successful' });
});

// GET /preferences
app.get('/preferences', (req, res) => {
  // Check if user is authenticated 
  // For simplicity, let's assume the username is sent as a query parameter `username`
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  // Check if preferences exist for the user
  const userPreferences = preferences[username];
  if (!userPreferences) {
    return res.status(404).json({ message: 'Preferences not found' });
  }

  return res.status(200).json(userPreferences);
});

// PUT /preferences
app.put('/preferences', (req, res) => {
  // Check if user is authenticated 
  // For simplicity, let's assume the username is sent as a query parameter `username`
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  const userPreferences = req.body;

  // Validate input
  if (!userPreferences) {
    return res.status(400).json({ message: 'Preferences are required' });
  }

  // Update user preferences
  preferences[username] = userPreferences;
  return res.status(200).json({ message: 'Preferences updated successfully' });
});

// GET /news
app.get('/news', (req, res) => {
  // Fetch and return news 
  return res.status(200).json(news);
});
