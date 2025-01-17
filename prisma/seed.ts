import { Prisma, PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    let teams: string[] = [
        "Real Madrid",
        "Barcelona",
        "Atletico Madrid",
        "Sevilla",
        "Valencia",
        "Real Sociedad", 
        "Villarreal", 
        "Real Betis", 
        "Athletic Bilbao", 
        "Celta Vigo"
    ];

   for (const team of teams){
    await prisma.team.create({
        data: {
            name: team
        }
    });
   }

    for (let i = 0; i < 100; i++) {
        await prisma.player.create({
            data: {
                name: faker.person.fullName(),
                goalCount: faker.number.int({ min: 0, max: 100 }),
                birthDate: faker.date.birthdate(),
                teamId: faker.number.int({ min: 1, max: 10 })
            }
        });
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });