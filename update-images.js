"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const validCampusImages = [
    "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1574958269340-fa927503f3dd?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559135197-8a45ea74d367?w=800&auto=format&fit=crop"
];
async function updateImages() {
    const colleges = await prisma.college.findMany();
    for (let i = 0; i < colleges.length; i++) {
        const college = colleges[i];
        // Assign a guaranteed valid campus image to every college
        const image = validCampusImages[i % validCampusImages.length];
        await prisma.college.update({
            where: { id: college.id },
            data: { image }
        });
        console.log(`Updated valid campus image for ${college.slug}`);
    }
    console.log("All DB images updated to valid campus photos!");
}
updateImages()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
