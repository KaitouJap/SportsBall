import { Prisma, PrismaClient, team } from "@prisma/client";
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
    const teamResult: team[] = [];

    for (const team of teams){
        const res = await prisma.team.create({
            data: {
                name: team
            }
        });
        teamResult.push(res);
    }

    let min = teamResult[0].id;
    let max = teamResult[teamResult.length - 1].id;
    for (let i = 0; i < 100; i++) {
        await prisma.player.create({
            data: {
                name: faker.person.fullName(),
                goalCount: faker.number.int({ min: 0, max: 100 }),
                birthDate: faker.date.birthdate(),
                teamId: faker.number.int({ min: min, max: max })
            }
        });
    }

    for (let i = 0; i < 25; i++) {
        await prisma.match.create({
            data: {
                date: faker.date.recent(),
                homeTeamId: faker.number.int({ min: min, max: max }),
                awayTeamId: faker.number.int({ min: min, max: max }),
                homeGoals: faker.number.int({ min: 0, max: 5 }),
                awayGoals: faker.number.int({ min: 0, max: 5 })
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