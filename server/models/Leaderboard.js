const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
    rankings: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            score: {
                type: Number,
                default: 0, // Default score can be 0 or undefined
            },
            beers: {
                type: Number,
                default: 0,
            }
        },
    ],
    squad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Squad',
        required: false,
    },
});

// Method to calculate scores for each user in the leaderboard
leaderboardSchema.methods.calculateScores = async function () {
    const users = await this.populate({
        path: 'rankings.userId',
        select: 'total_steps total_beers', // Select only required fields
    });

    // Calculate scores and sort rankings
    const updatedRankings = users.rankings.map((ranking) => {
        const user = ranking.userId;
        if (user) {
            // Calculate score as total_steps - (total_beers * 100)
            const score = user.total_steps - user.total_beers * 100;
            return {
                userId: ranking.userId,
                score: score,
            };
        }
        return ranking; // Fallback if user is not found
    });

    // Sort by score descending
    updatedRankings.sort((a, b) => b.score - a.score);

    // Update rankings in the leaderboard
    this.rankings = updatedRankings;
    await this.save(); // Save the updated rankings
};

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
module.exports = Leaderboard;