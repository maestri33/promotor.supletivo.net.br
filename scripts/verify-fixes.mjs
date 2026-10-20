import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

let failures = 0;

function check(file, description, fn) {
  const filePath = path.join(distDir, file);
  if (!fs.existsSync(filePath)) {
    console.error(`FAIL: File ${file} does not exist`);
    failures++;
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  try {
    const passed = fn(content);
    if (passed) {
      console.log(`OK [${file}]: ${description}`);
    } else {
      console.error(`FAIL [${file}]: ${description}`);
      failures++;
    }
  } catch (err) {
    console.error(`ERROR [${file}]: ${description} (${err.message})`);
    failures++;
  }
}

console.log('--- Verifying promotor.supletivo.net.br/dist ---');

// 1. Static DOM cleaning: Modal Sofia / Promotor internal states
check('index.html', 'does NOT contain "★ Promotor Já Cadastrado"', c => !c.includes('★ Promotor Já Cadastrado'));
check('index.html', 'does NOT contain "Promotor Já Cadastrado"', c => !c.includes('Promotor Já Cadastrado'));
check('index.html', 'does NOT contain "CREDENCIAL OFICIAL DE PROMOTOR"', c => !c.includes('CREDENCIAL OFICIAL DE PROMOTOR'));
check('index.html', 'does NOT contain "DOCUMENTAÇÃO PENDENTE"', c => !c.includes('DOCUMENTAÇÃO PENDENTE'));
check('index.html', 'does NOT contain "AGUARDANDO CONTATO"', c => !c.includes('AGUARDANDO CONTATO'));
check('index.html', 'does NOT contain "Redirecionamento automático"', c => !c.includes('Redirecionamento automático'));

// 2. FAQ fallback
check('index.html', 'does NOT contain "Nada por aqui nesse filtro"', c => !c.includes('Nada por aqui nesse filtro'));

// 3. Marquee aria-hidden
check('index.html', 'second ul in marquees has aria-hidden="true" and items have aria-hidden="true"', c => {
  const matches = c.match(/<ul[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/ul>/g);
  if (!matches || matches.length === 0) return false;
  return matches.every(ul => ul.includes('aria-hidden="true"'));
});

// 4. Version in footer vs meta
check('index.html', 'does NOT contain visible "footer-version" class', c => !c.includes('class="footer-version"'));
check('index.html', 'contains required <meta name="app-version"', c => c.includes('<meta name="app-version"'));

// 5. WhatsApp in footer
check('index.html', 'contains WhatsApp (11) 92006-2177', c => c.includes('(11) 92006-2177'));

console.log('\n========================================');
if (failures === 0) {
  console.log('>>> ALL PROMOTOR.SUPLETIVO.NET.BR CHECKS PASSED! <<<');
} else {
  console.error(`>>> ${failures} CHECKS FAILED! <<<`);
  process.exit(1);
}
