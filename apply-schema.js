const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://svmpuynlvrcccbykdfco.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2bXB1eW5sdnJjY2NieWtkZmNvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzMxOTA0MywiZXhwIjoyMDc4ODk1MDQzfQ.mcX-m988NNGb5FfE0R3Yt7RCfFuX6JHvo2JeZgGNGnQ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function applySchema() {
  const sql = fs.readFileSync('supabase-schema.sql', 'utf8');
  
  // Split SQL into individual statements
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));
  
  console.log(`Executing ${statements.length} SQL statements...`);
  
  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i] + ';';
    try {
      const { data, error } = await supabase.rpc('exec_sql', { sql: statement });
      if (error) {
        console.log(`Statement ${i + 1}: ${error.message}`);
      } else {
        console.log(`Statement ${i + 1}: Success`);
      }
    } catch (err) {
      console.log(`Statement ${i + 1}: ${err.message}`);
    }
  }
  
  console.log('Schema application completed!');
}

applySchema().catch(console.error);
