import './Community.css';

const Community = () => {
  const forumTopics = [
    {
      id: 1,
      title: "Show off your latest TIC-80 creation!",
      author: "GameDev123",
      replies: 45,
      lastPost: "2 hours ago",
      category: "Showcase"
    },
    {
      id: 2,
      title: "Tips for optimizing sprite animations",
      author: "PixelMaster",
      replies: 23,
      lastPost: "5 hours ago",
      category: "Help"
    },
    {
      id: 3,
      title: "TIC-80 Game Jam - Winter 2025",
      author: "JamOrganizer",
      replies: 67,
      lastPost: "1 day ago",
      category: "Events"
    },
    {
      id: 4,
      title: "How to implement smooth scrolling?",
      author: "NewbieCoder",
      replies: 12,
      lastPost: "2 days ago",
      category: "Help"
    },
    {
      id: 5,
      title: "Best practices for sound design in TIC-80",
      author: "AudioWizard",
      replies: 34,
      lastPost: "3 days ago",
      category: "Tutorial"
    }
  ];

  const featuredMembers = [
    {
      id: 1,
      username: "nesbox",
      role: "Creator",
      avatar: "/avatars/nesbox.png",
      games: 15,
      reputation: 9999
    },
    {
      id: 2,
      username: "PixelArtist",
      role: "Moderator",
      avatar: "/avatars/pixel.png",
      games: 42,
      reputation: 1250
    },
    {
      id: 3,
      username: "CodeMaster",
      role: "Veteran",
      avatar: "/avatars/code.png",
      games: 28,
      reputation: 890
    },
    {
      id: 4,
      username: "SoundDesigner",
      role: "Member",
      avatar: "/avatars/sound.png",
      games: 19,
      reputation: 567
    }
  ];

  return (
    <div className="community">
      <div className="container">
        <header className="community-header">
          <h1>*** TIC-80 COMMUNITY ***</h1>
          <p>Connect with fellow developers, share your creations, and get help</p>
        </header>

        <div className="community-stats">
          <div className="stat-card">
            <h3>1,247</h3>
            <p>Active Members</p>
          </div>
          <div className="stat-card">
            <h3>3,892</h3>
            <p>Games Created</p>
          </div>
          <div className="stat-card">
            <h3>15,634</h3>
            <p>Forum Posts</p>
          </div>
          <div className="stat-card">
            <h3>89</h3>
            <p>Online Now</p>
          </div>
        </div>

        <div className="community-content">
          <div className="forum-section">
            <h2>Recent Forum Activity</h2>
            <div className="forum-topics">
              {forumTopics.map(topic => (
                <div key={topic.id} className="topic-card">
                  <div className="topic-info">
                    <div className="topic-category">{topic.category}</div>
                    <h3 className="topic-title">{topic.title}</h3>
                    <div className="topic-meta">
                      <span className="topic-author">by {topic.author}</span>
                      <span className="topic-replies">{topic.replies} replies</span>
                      <span className="topic-time">{topic.lastPost}</span>
                    </div>
                  </div>
                  <div className="topic-actions">
                    <button className="reply-btn">Reply</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="forum-actions">
              <button className="new-topic-btn">+ New Topic</button>
              <button className="view-all-btn">View All Topics</button>
            </div>
          </div>

          <div className="sidebar">
            <div className="featured-members">
              <h3>Featured Members</h3>
              <div className="members-list">
                {featuredMembers.map(member => (
                  <div key={member.id} className="member-card">
                    <div className="member-avatar">
                      <img src={member.avatar} alt={member.username} />
                    </div>
                    <div className="member-info">
                      <h4>{member.username}</h4>
                      <p className="member-role">{member.role}</p>
                      <div className="member-stats">
                        <span>{member.games} games</span>
                        <span>{member.reputation} rep</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="quick-links">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#discord">Discord Server</a></li>
                <li><a href="#github">GitHub Repository</a></li>
                <li><a href="#wiki">Community Wiki</a></li>
                <li><a href="#tutorials">Video Tutorials</a></li>
                <li><a href="#resources">Asset Library</a></li>
              </ul>
            </div>

            <div className="community-rules">
              <h3>Community Guidelines</h3>
              <ul>
                <li>Be respectful to all members</li>
                <li>Share your knowledge freely</li>
                <li>Help newcomers learn</li>
                <li>Keep content family-friendly</li>
                <li>No spam or self-promotion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
