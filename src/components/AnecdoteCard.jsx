import api from '../services/api';
import { useState } from 'react';

export default function AnecdoteCard({ anecdote }) {
  // Initial votes et le vote de l'utilisateur (null si pas voté)
  const [votes, setVotes] = useState({
    Bof: anecdote.votes_bof || 0,
    Excellent: anecdote.votes_excellent || 0,
    Technique: anecdote.votes_technique || 0,
    Wow: anecdote.votes_wow || 0,
  });
  const [userVote, setUserVote] = useState(anecdote.user_vote_type || null);

  const vote = async (type) => {
    if (userVote === type) return; // Pas besoin de re-voter la même option

    try {
      await api.post(`/anecdotes/${anecdote.id}/vote`, { type });

      // Mise à jour locale des compteurs de vote
      setVotes(prev => {
        const newVotes = { ...prev };

        // Si l'utilisateur avait déjà voté, on décrémente l'ancien type
        if (userVote) {
          newVotes[userVote] = Math.max((newVotes[userVote] || 1) - 1, 0);
        }

        // On incrémente le nouveau type
        newVotes[type] = (newVotes[type] || 0) + 1;

        return newVotes;
      });

      // On met à jour le vote de l'utilisateur localement
      setUserVote(type);
    } catch (error) {
      alert("vous avez deja voter" || 'Erreur lors du vote');
    }
  };

  return (
    <div style={{
      backgroundColor: '#1c1c1c',
      color: '#fff',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '20px',
    }}>
      <h3 style={{ color: '#FFD700' }}>{anecdote.title}</h3>
      <p>{anecdote.content}</p>

      <div className="d-flex gap-3 flex-wrap">
        {['Bof', 'Excellent', 'Technique', 'Wow'].map(type => (
          <button
            key={type}
            onClick={() => vote(type)}
            style={{
              backgroundColor: userVote === type ? '#ffcc00' : '#FFD700',
              color: '#121212',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              opacity: userVote && userVote !== type ? 0.7 : 1,
              transition: '0.3s',
            }}
          >
            {type} ({votes[type]})
          </button>
        ))}
      </div>
    </div>
  );
}
