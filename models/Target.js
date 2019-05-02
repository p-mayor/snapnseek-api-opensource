"use strict"
module.exports = function(sequelize, DataTypes) {
    const Target = sequelize.define(
        "target",
        {
            text: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [2, 255],
                        msg: "Message text must be between 2 and 255 characters"
                    }
                }
            },
            userId: DataTypes.INTEGER,
            pictureURL: {
                type: DataTypes.STRING,
                allowNull: true
            },
            pictureContentType: {
                type: DataTypes.STRING,
                allowNull: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            neighborhood: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            defaultScope: {
                attributes: {
                    exclude: [
                        "password",
                        "picture",
                        "pictureContentType",
                        "updatedAt"
                    ]
                }
            },
            scopes: {
                target: {
                    attributes: {
                        exclude: [
                            "id",
                            "username",
                            "displayName",
                            "password",
                            "about",
                            "createdAt",
                            "updatedAt"
                        ]
                    }
                }
            }
        }
    )
    return Target
}
