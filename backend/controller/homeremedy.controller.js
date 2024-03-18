import { validationResult } from "express-validator";
import HomeRemedy from "../model/homeremedy.model.js";

export const Add = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    HomeRemedy.create({
        remedyName: request.body.remedyName,
        description: request.body.description,
        ingredients: request.body.ingredients,
        instructions: request.body.instructions,
        imageUrl: request.body.imageUrl,
        caution: request.body.caution,
        categoryname: request.body.categoryname
    })
        .then((result) => {
            return response.status(200).json({ message: "HomeRemedy Saved...." });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error...", err });
        })
}

export const saveInBulk = async (request, response, next) => {
    try {
        let HomeRemedyList = request.body;

        for (let homeremedy of HomeRemedyList) {
            let { id, remedyName, description, ingredients, instructions, imageUrl, caution, categoryname } = homeremedy;

            await HomeRemedy.create({
                id, remedyName, description, ingredients, instructions, imageUrl, caution, categoryname
            })
        }
        return response.status(200).json({ message: "All HomeRemedy Saved...." });
    } catch (err) {
        return response.status(500).json({ error: "Internal Server Error", err });
    }
}

export const Update = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    HomeRemedy.update({
        remedyName: request.body.remedyName,
        description: request.body.description,
        ingredients: request.body.ingredients,
        instructions: request.body.instructions,
        imageUrl: request.body.imageUrl,
        caution: request.body.caution,
        categoryname: request.body.categoryname
    }, {
        where: { id: request.body.id },
        raw: true
    })
        .then((result) => {
            if (result[0])
                return response.status(200).json({ message: "HomeRemedy Updated...." });
            return response.status(401).json({ message: "Unauthorized reguest...." });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error...", err });
        })
}

export const getHomeRemedy = async (request, response, next) => {
    HomeRemedy.findAll()
        .then(result => {
            return response.status(200).json({ HomeRemedyList: result });
        }).catch(err => {
            return response.status(500).json({ error: "Internal Server Error", err });
        })
}

export const getHomeRemedyByCategory = (request, response, next) => {
    HomeRemedy.findAll({ where: { categoryname: request.params.categoryName } })
        .then(result => {
            if (result[0])
                return response.status(200).json({ HomeRemedyList: result })
            return response.status(401).json({ message: "Unauthorized reguest...." });
        }).catch(err => {
            return response.status(500).json({ error: "Internal Server Error", err });
        })
}

export const Remove = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(401).json({ error: errors.array() });

    HomeRemedy.destroy({
        where: { id: request.body.id },
        raw: true
    })
        .then((result) => {
            if (result)
                return response.status(200).json({ message: "HomeRemedy Removed...." });
            return response.status(401).json({ message: "Unauthorized reguest...." });
        })
        .catch((err) => {
            return response.status(500).json({ error: "Internal server error...", err });
        })
}