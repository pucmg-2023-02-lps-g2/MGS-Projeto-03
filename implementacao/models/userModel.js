async function createSchema() {
    const { data, error } = await supabase
      .from('public') // 'public' is the schema name, change it if needed
      .schema()
      .upsert([
        {
          name: 'users', // Name of your user table
          columns: [
            { name: 'id', type: 'uuid', primary: true },
            { name: 'email', type: 'text', unique: true },
            { name: 'password', type: 'text' },
            // Add more columns as needed for your user data
          ],
        },
      ]);
  
    if (error) {
      console.error('Error creating user schema:', error);
    } else {
      console.log('User schema created successfully');
    }
  }
  
  createSchema();