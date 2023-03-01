import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === "GET") {
    const { admin, lastStarterHighlightSent } = req.query;

    try {
      let starterHighlights;
      if (admin) {
        starterHighlights = await prisma.starterHighlight.findMany({
          orderBy: {
            id: "desc",
          },
        });
      } else {
        const isLastID = lastStarterHighlightSent && typeof lastStarterHighlightSent === "number";
        if (!isLastID) return res.status(400).json("Invalid last-sent starter highlight ID.");

        starterHighlights = await prisma.starterHighlight.findMany({
          take: 3,
          orderBy: {
            id: "asc",
          },
          where: {
            id: {
              gt: lastStarterHighlightSent,
            },
          },
        });
      }

      return res.status(200).json(starterHighlights);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Something went wrong" });
      }
    }
  } else if (req.method === "POST") {
    if (!req.body.title) return res.status(500).json({ message: "No title provided." });
    if (!req.body.author) return res.status(500).json({ message: "No author provided." });
    if (!req.body.content) return res.status(500).json({ message: "No content provided." });
    try {
      await prisma.starterHighlight.create({
        data: {
          title: req.body.title,
          author: req.body.author,
          content: req.body.content,
        },
      });
      return res.status(200).json("success");
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Something went wrong" });
      }
    }
  } else if (req.method === "PATCH") {
    console.log("PATH");
    if (!req.body.id || typeof req.body.id !== "number") return res.status(400).json("Invalid id.");

    try {
      await prisma.starterHighlight.update({
        where: {
          id: req.body.id,
        },
        data: {
          title: req.body.title,
          author: req.body.author,
          content: req.body.content,
        },
      });

      return res.status(200).json("success");
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Something went wrong" });
      }
    }
  } else if (req.method === "DELETE") {
    if (!req.query.id) return res.status(400).json("Invalid id.");

    try {
      await prisma.starterHighlight.delete({
        where: {
          id: Number(req.query.id),
        },
      });

      return res.status(200).json("success");
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Something went wrong" });
      }
    }
  }
};

export default handler;
