import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed dos dados...');

  // Limpar dados existentes (opcional)
  await prisma.letter.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.pigeon.deleteMany();

  // 1. CRIAR POMBOS (3 pombos - 1 aposentado)
  console.log('🐦 Criando pombos...');

  const flash = await prisma.pigeon.create({
    data: {
      nickname: 'Flash',
      photoUrl: 'https://example.com/flash.jpg',
      averageSpeed: 85.5,
      isActive: true,
    },
  });

  const sonic = await prisma.pigeon.create({
    data: {
      nickname: 'Sonic',
      photoUrl: 'https://example.com/sonic.jpg',
      averageSpeed: 92.0,
      isActive: true,
    },
  });

  const thunder = await prisma.pigeon.create({
    data: {
      nickname: 'Thunder',
      photoUrl: 'https://example.com/thunder.jpg',
      averageSpeed: 78.3,
      isActive: false, // Aposentado
    },
  });

  console.log(
    `✅ Criados 3 pombos: ${flash.nickname}, ${sonic.nickname}, ${thunder.nickname} (aposentado)`,
  );

  // 2. CRIAR CLIENTES (2 clientes)
  console.log('👥 Criando clientes...');

  const joao = await prisma.customer.create({
    data: {
      name: 'João Silva',
      email: 'joao.silva@email.com',
      birthDate: new Date('1990-05-15'),
      address: 'Rua das Flores, 123 - São Paulo, SP',
    },
  });

  const maria = await prisma.customer.create({
    data: {
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      birthDate: new Date('1985-08-22'),
      address: 'Avenida Central, 456 - Rio de Janeiro, RJ',
    },
  });

  console.log(`✅ Criados 2 clientes: ${joao.name}, ${maria.name}`);

  // 3. CRIAR CARTAS (5 cartas com status variados)
  console.log('📮 Criando cartas...');

  await prisma.letter.create({
    data: {
      content: 'Olá Maria! Como você está? Espero que esteja tudo bem por aí.',
      recipientName: 'Maria Oliveira',
      recipientAddress: 'Rua das Palmeiras, 789 - Belo Horizonte, MG',
      status: 'DELIVERED',
      senderId: joao.id,
      pigeonId: flash.id,
    },
  });

  await prisma.letter.create({
    data: {
      content: 'Prezado Sr. Carlos, segue em anexo as informações solicitadas.',
      recipientName: 'Carlos Ferreira',
      recipientAddress: 'Praça da Liberdade, 321 - Salvador, BA',
      status: 'SENT',
      senderId: maria.id,
      pigeonId: sonic.id,
    },
  });

  await prisma.letter.create({
    data: {
      content: 'Convite para festa de aniversário na próxima semana!',
      recipientName: 'Ana Costa',
      recipientAddress: 'Rua do Sol, 654 - Recife, PE',
      status: 'QUEUED',
      senderId: joao.id,
      pigeonId: flash.id,
    },
  });

  await prisma.letter.create({
    data: {
      content: 'Relatório mensal de vendas conforme solicitado.',
      recipientName: 'Pedro Lima',
      recipientAddress: 'Avenida Paulista, 987 - São Paulo, SP',
      status: 'DELIVERED',
      senderId: maria.id,
      pigeonId: sonic.id,
    },
  });

  await prisma.letter.create({
    data: {
      content: 'Obrigado pelo excelente atendimento na última visita.',
      recipientName: 'Roberto Souza',
      recipientAddress: 'Rua da Praia, 147 - Florianópolis, SC',
      status: 'QUEUED',
      senderId: joao.id,
      pigeonId: flash.id,
    },
  });

  console.log(`✅ Criadas 5 cartas com status variados`);

  // 4. RESUMO
  console.log('\n🎯 RESUMO DO SEED:');
  console.log(`📊 Pombos: 3 (2 ativos, 1 aposentado)`);
  console.log(`📊 Clientes: 2`);
  console.log(`📊 Cartas: 5 (2 entregues, 1 enviada, 2 na fila)`);
  console.log('\n✅ Seed completado com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
