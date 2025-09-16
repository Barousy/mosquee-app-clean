import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ecole.com' },
    update: {},
    create: {
      name: 'Administrateur École',
      email: 'admin@ecole.com',
      password: adminPassword,
      role: 'ADMIN',
      phone: '+33123456789',
      address: '123 Rue de la Mosquée, Paris, France',
    },
  })

  // Create sample mosque
  const mosque = await prisma.mosque.upsert({
    where: { id: 'main-mosque' },
    update: {},
    create: {
      id: 'main-mosque',
      name: 'École Coranique Centrale',
      address: '123 Avenue de la République',
      city: 'Paris',
      country: 'France',
      phone: '+33123456789',
      email: 'info@ecolecoranique.fr',
      website: 'https://ecolecoranique.fr',
      latitude: 48.8566,
      longitude: 2.3522,
    },
  })

  // Create sample prayer times for today
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const prayerTimes = [
    {
      date: today,
      fajr: '05:30',
      sunrise: '06:45',
      dhuhr: '12:15',
      asr: '15:30',
      maghrib: '18:45',
      isha: '20:00',
    },
    {
      date: tomorrow,
      fajr: '05:28',
      sunrise: '06:43',
      dhuhr: '12:15',
      asr: '15:32',
      maghrib: '18:47',
      isha: '20:02',
    },
  ]

  for (const prayerTime of prayerTimes) {
    await prisma.prayerTime.upsert({
      where: {
        mosqueId_date: {
          mosqueId: mosque.id,
          date: prayerTime.date,
        },
      },
      update: prayerTime,
      create: {
        ...prayerTime,
        mosqueId: mosque.id,
      },
    })
  }

  // Create sample events
  const events = [
    {
      title: 'Service de prière du vendredi',
      description: 'Service hebdomadaire de prière du vendredi avec rassemblement communautaire',
      startDate: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Tomorrow
      eventType: 'PRAYER' as const,
      mosqueId: mosque.id,
      createdBy: admin.id,
    },
    {
      title: 'Cercle d\'étude islamique',
      description: 'Session d\'étude hebdomadaire sur les enseignements islamiques et le Coran',
      startDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000), // In 3 days
      eventType: 'LECTURE' as const,
      mosqueId: mosque.id,
      createdBy: admin.id,
    },
    {
      title: 'Iftar communautaire',
      description: 'Rassemblement communautaire mensuel d\'iftar pendant le Ramadan',
      startDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000), // In a week
      eventType: 'COMMUNITY' as const,
      mosqueId: mosque.id,
      createdBy: admin.id,
    },
  ]

  for (const event of events) {
    await prisma.event.create({
      data: event,
    })
  }

  // Create sample announcements
  const announcements = [
    {
      title: 'Bienvenue sur notre nouveau site',
      content: 'Nous sommes ravis de lancer notre nouveau système de gestion scolaire islamique. Cette plateforme nous aidera à mieux servir notre communauté.',
      priority: 'HIGH' as const,
      createdBy: admin.id,
      mosqueId: mosque.id,
    },
    {
      title: 'Planning Ramadan 2024',
      content: 'Veuillez trouver les horaires de prière mis à jour et les programmes spéciaux pour le mois de Ramadan à venir.',
      priority: 'MEDIUM' as const,
      createdBy: admin.id,
      mosqueId: mosque.id,
    },
  ]

  for (const announcement of announcements) {
    await prisma.announcement.create({
      data: announcement,
    })
  }

  // Create sample donations
  const donations = [
    {
      amount: 500.00,
      type: 'GENERAL' as const,
      description: 'Donation générale pour les opérations de l\'école',
      donorId: admin.id,
      status: 'COMPLETED' as const,
      paymentMethod: 'Carte de crédit',
    },
    {
      amount: 1000.00,
      type: 'ZAKAT' as const,
      description: 'Paiement de la Zakat pour l\'année',
      donorId: admin.id,
      status: 'COMPLETED' as const,
      paymentMethod: 'Virement bancaire',
    },
  ]

  for (const donation of donations) {
    await prisma.donation.create({
      data: donation,
    })
  }

  console.log('✅ Base de données initialisée avec succès !')
  console.log('👤 Utilisateur admin créé : admin@ecole.com / admin123')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
