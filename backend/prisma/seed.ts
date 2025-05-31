import { db } from "../src/db";

import { CampaignStatus, CampaignType, EmailStatus } from "../generated/prisma";

async function main() {
  console.log("🌱 Seeding database...");

  const campaigns = await Promise.all([
    db.campaign.create({
      data: {
        name: "Spring Launch",
        startDate: new Date(Date.now() + 86400000),
        endDate: new Date(Date.now() + 86400000 * 7),
        targetAudience: "Young Adults",
        type: CampaignType.EMAIL,
        status: CampaignStatus.SCHEDULED,
        emails: {
          create: [
            {
              from: "spring@example.com",
              to: "alice@example.com",
              subject: "Spring is here!",
              body: "Check out our new spring arrivals.",
              status: EmailStatus.SENT,
              sentAt: new Date(),
            },
            {
              from: "spring@example.com",
              to: "bob@example.com",
              subject: "Spring Offers",
              body: "Special discounts just for you!",
              status: EmailStatus.DELIVERED,
              sentAt: new Date(),
            },
          ],
        },
      },
    }),

    db.campaign.create({
      data: {
        name: "Summer Promo",
        startDate: new Date(Date.now() + 86400000 * 10),
        endDate: new Date(Date.now() + 86400000 * 20),
        targetAudience: "Families",
        type: CampaignType.SOCIAL,
        status: CampaignStatus.UNSCHEDULED,
        emails: {
          create: [
            {
              from: "summer@example.com",
              to: "carol@example.com",
              subject: "Hot Summer Deals!",
              body: "Save big this summer season.",
              status: EmailStatus.SENT,
              sentAt: new Date(),
            },
          ],
        },
      },
    }),

    db.campaign.create({
      data: {
        name: "Back to School",
        startDate: new Date(Date.now() + 86400000 * 15),
        endDate: new Date(Date.now() + 86400000 * 25),
        targetAudience: "Students",
        type: CampaignType.SMS,
        status: CampaignStatus.UNSCHEDULED,
        emails: {
          create: [
            {
              from: "school@example.com",
              to: "dave@example.com",
              subject: "Gear Up for School!",
              body: "Backpacks, notebooks, and more on sale!",
              status: EmailStatus.OPENED,
              sentAt: new Date(),
            },
            {
              from: "school@example.com",
              to: "emma@example.com",
              subject: "School Supplies Bonanza!",
              body: "Everything you need for a successful year.",
              status: EmailStatus.DELIVERED,
              sentAt: new Date(),
            },
          ],
        },
      },
    }),

    db.campaign.create({
      data: {
        name: "Winter Clearance",
        startDate: new Date(Date.now() - 86400000 * 10), // already started
        endDate: new Date(Date.now() - 86400000 * 3),
        targetAudience: "Bargain Hunters",
        type: CampaignType.EMAIL,
        status: CampaignStatus.COMPLETED,
        emails: {
          create: [
            {
              from: "winter@example.com",
              to: "frank@example.com",
              subject: "Final Winter Sale!",
              body: "Last chance to save big.",
              status: EmailStatus.SENT,
              sentAt: new Date(Date.now() - 86400000 * 5),
            },
          ],
        },
      },
    }),
  ]);

  console.log(`✅ Seeded ${campaigns.length} campaigns.`);
}

main()
  .then(() => {
    console.log("🌱 Seeding complete.");
    return db.$disconnect();
  })
  .catch((e) => {
    console.error("❌ Error seeding:", e);
    return db.$disconnect().finally(() => process.exit(1));
  });
