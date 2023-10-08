# Exemplos de queries

### Selecionar nome de um estudante a partir de seu CPF

``` javascript
async function selectStudent() {
    try {
        let { data, error } = await supabase
        .from('students')
        .select('name')
        .eq('cpf', '9704705093')
        .single();

        if (error) {
            throw error;
        }

        return data ? data.name : null;
    } catch (error) {
        console.error('Error:', error.message);
    }
}
```