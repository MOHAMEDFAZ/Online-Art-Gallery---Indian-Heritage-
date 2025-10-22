import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Clear existing
  await prisma.like.deleteMany()
  await prisma.artwork.deleteMany()

  await prisma.artwork.createMany({
    data: [
      {
        title: "Nataraja - Lord of Dance",
        artist: "Chola Dynasty Artisan",
        period: "10th Century CE",
        category: "Sculpture",
        description:
          "A stunning bronze depiction of Shiva as Nataraja, symbolizing cosmic cycles of creation and destruction.",
        imageUrl: "/ancient-indian-bronze-nataraja-sculpture-dancing-p.jpg",
        medium: "Bronze",
        location: "Tamil Nadu, India",
      },
      {
        title: "Mughal Miniature - Radha Krishna",
        artist: "Mughal Court Painter",
        period: "17th Century",
        category: "Painting",
        description:
          "An intimate portrayal of Radha and Krishna in a lush garden, exemplifying Mughal miniature finesse.",
        imageUrl: "/mughal-miniature-painting-of-radha-krishna-in-gard.jpg",
        medium: "Gouache on paper",
      },
      {
        title: "Warli Folk Motifs",
        artist: "Warli Community",
        period: "20th Century",
        category: "Folk Art",
        description:
          "Geometric human and animal forms in rhythmic patterns, celebrating everyday life and rituals.",
        imageUrl: "/traditional-indian-warli-folk-art-with-geometric-p.jpg",
        medium: "Natural pigments on wall",
      },
      {
        title: "Madhubani Harmony",
        artist: "Mithila Artist",
        period: "20th Century",
        category: "Folk Art",
        description:
          "Dense floral and geometric patterns representing harmony between humans, animals, and nature.",
        imageUrl: "/colorful-indian-folk-art-madhubani-painting-tradit.jpg",
        medium: "Natural dyes on paper",
      },
      {
        title: "Royal Procession",
        artist: "Rajasthani Miniature School",
        period: "18th Century",
        category: "Painting",
        description:
          "A vibrant palace scene capturing regal splendor and ceremonial pageantry of Rajasthan.",
        imageUrl: "/rajasthani-miniature-painting-royal-palace-scene-v.jpg",
        medium: "Tempera on paper",
      },
      {
        title: "Mughal Court Scene",
        artist: "Mughal Atelier",
        period: "17th Century",
        category: "Painting",
        description:
          "Intricate details and rich palettes depicting courtly life and artistic sophistication.",
        imageUrl: "/mughal-miniature-painting-with-intricate-details-a.jpg",
        medium: "Opaque watercolor on paper",
      },
      {
        title: "Ajanta Cave Paintings",
        artist: "Buddhist Monks",
        period: "2nd Century BCE - 6th Century CE",
        category: "Mural Painting",
        description:
          "Ancient Buddhist cave paintings depicting Jataka tales and Buddha's life with remarkable detail and spiritual depth.",
        imageUrl: "/ajanta-cave-paintings.jpg",
        medium: "Fresco on cave walls",
        location: "Ajanta, Maharashtra",
        significance: "UNESCO World Heritage Site, earliest surviving Indian paintings",
      },
      {
        title: "Ellora Kailasa Temple",
        artist: "Rashtrakuta Dynasty",
        period: "8th Century CE",
        category: "Architecture",
        description:
          "Monolithic temple carved from single rock, representing Mount Kailash, showcasing extraordinary architectural achievement.",
        imageUrl: "/ellora-kailasa-temple.jpg",
        medium: "Carved basalt rock",
        location: "Ellora, Maharashtra",
        significance: "Largest monolithic structure in the world",
      },
      {
        title: "Konark Sun Temple",
        artist: "Ganga Dynasty",
        period: "13th Century CE",
        category: "Architecture",
        description:
          "Magnificent temple dedicated to Surya, the sun god, with intricate stone carvings and architectural brilliance.",
        imageUrl: "/konark-sun-temple.jpg",
        medium: "Sandstone and laterite",
        location: "Konark, Odisha",
        significance: "UNESCO World Heritage Site, architectural marvel",
      },
      {
        title: "Khajuraho Temples",
        artist: "Chandela Dynasty",
        period: "10th-11th Century CE",
        category: "Architecture",
        description:
          "Group of temples famous for their erotic sculptures and intricate carvings depicting various aspects of life.",
        imageUrl: "/khajuraho-temples.jpg",
        medium: "Sandstone",
        location: "Khajuraho, Madhya Pradesh",
        significance: "UNESCO World Heritage Site, finest example of Nagara architecture",
      },
      {
        title: "Sanchi Stupa",
        artist: "Mauryan Empire",
        period: "3rd Century BCE",
        category: "Architecture",
        description:
          "Ancient Buddhist stupa with elaborate gateways (toranas) depicting scenes from Buddha's life and Jataka tales.",
        imageUrl: "/sanchi-stupa.jpg",
        medium: "Stone and brick",
        location: "Sanchi, Madhya Pradesh",
        significance: "Oldest stone structure in India, UNESCO World Heritage Site",
      },
      {
        title: "Bharat Mata Temple",
        artist: "Modern Indian Artists",
        period: "1936 CE",
        category: "Painting",
        description:
          "Revolutionary painting depicting Mother India as a goddess, symbolizing the freedom struggle and national unity.",
        imageUrl: "/bharat-mata-temple.jpg",
        medium: "Oil on canvas",
        location: "Varanasi, Uttar Pradesh",
        significance: "First temple dedicated to Mother India",
      },
      {
        title: "Tanjore Paintings",
        artist: "Thanjavur School",
        period: "16th-19th Century CE",
        category: "Painting",
        description:
          "Rich, colorful paintings with gold leaf work, depicting Hindu deities and mythological scenes with divine grandeur.",
        imageUrl: "/tanjore-paintings.jpg",
        medium: "Gold leaf, precious stones on wood",
        location: "Thanjavur, Tamil Nadu",
        significance: "Classical South Indian painting style",
      },
      {
        title: "Kangra Miniature Paintings",
        artist: "Kangra School",
        period: "18th-19th Century CE",
        category: "Painting",
        description:
          "Delicate miniature paintings characterized by soft colors and romantic themes, especially Radha-Krishna legends.",
        imageUrl: "/kangra-miniature-paintings.jpg",
        medium: "Watercolor on paper",
        location: "Kangra, Himachal Pradesh",
        significance: "Pinnacle of Pahari painting tradition",
      },
      {
        title: "Pattachitra",
        artist: "Odisha Traditional Artists",
        period: "12th Century CE - Present",
        category: "Painting",
        description:
          "Traditional cloth-based scroll painting depicting mythological stories with vibrant colors and intricate details.",
        imageUrl: "/pattachitra.jpg",
        medium: "Natural colors on cloth",
        location: "Odisha",
        significance: "Ancient art form continuing for centuries",
      },
      {
        title: "Kalamkari",
        artist: "Andhra Pradesh Artisans",
        period: "Ancient - Present",
        category: "Textile Art",
        description:
          "Hand-painted or block-printed cotton textile art depicting mythological themes with natural dyes.",
        imageUrl: "/kalamkari.jpg",
        medium: "Natural dyes on cotton",
        location: "Andhra Pradesh",
        significance: "Traditional textile art with mythological narratives",
      },
      {
        title: "Bagh Prints",
        artist: "Bagh Artisans",
        period: "Ancient - Present",
        category: "Textile Art",
        description:
          "Traditional block printing technique creating geometric and floral patterns on cotton fabric.",
        imageUrl: "/bagh-prints.jpg",
        medium: "Natural dyes, wooden blocks",
        location: "Bagh, Madhya Pradesh",
        significance: "Traditional textile printing heritage",
      },
      {
        title: "Chola Bronze Sculptures",
        artist: "Chola Dynasty",
        period: "9th-13th Century CE",
        category: "Sculpture",
        description:
          "Exquisite bronze sculptures of Hindu deities, particularly Shiva, showcasing perfect proportions and divine beauty.",
        imageUrl: "/chola-bronze-sculptures.jpg",
        medium: "Bronze casting",
        location: "Tamil Nadu",
        significance: "Golden age of bronze sculpture in India",
      },
      {
        title: "Hoysala Architecture",
        artist: "Hoysala Dynasty",
        period: "11th-14th Century CE",
        category: "Architecture",
        description:
          "Intricate temple architecture with detailed carvings, star-shaped platforms, and ornate pillars.",
        imageUrl: "/hoysala-architecture.jpg",
        medium: "Soapstone",
        location: "Karnataka",
        significance: "UNESCO World Heritage Sites at Belur and Halebidu",
      },
    ],
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })


