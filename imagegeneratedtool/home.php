<?php
include './config.php';
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>ImageGeneratedTool — 2026</title>

    <!-- Bootstrap 5 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">

    <!-- Google Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:SOFT,WONK,opsz,wght@0..100,0..1,9..144,400..700&family=Quicksand:wght@400;500;600;700&display=swap"
        rel="stylesheet">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="./assets/style.css">
</head>

<body>

    <div class="app-layout">

        <!-- SIDEBAR -->
        <aside class="sidebar" id="sidebar">

            <div class="sidebar-header">
                <a href="#" class="brand">
                    <span class="brand-icon">
                        <i class="bi bi-stars"></i>
                    </span>
                    <span>ImageGenerated<span class="brand-light">Tool</span></span>
                </a>

                <button class="icon-button sidebar-close" id="sidebarClose" aria-label="Close sidebar">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>

            <!-- New Project -->
            <div class="sidebar-actions">
                <button class="new-project-btn" id="newProjectBtn">
                    <i class="bi bi-plus-lg"></i>
                    <span>New image</span>
                </button>
            </div>

            <!-- Navigation -->
            <nav class="sidebar-nav">

                <div class="nav-section">
                    <span class="nav-label">WORKSPACE</span>

                    <a href="#" class="nav-item active">
                        <i class="bi bi-grid"></i>
                        <span>Explore</span>
                    </a>

                    <a href="#" class="nav-item">
                        <i class="bi bi-images"></i>
                        <span>My creations</span>
                    </a>

                    <a href="#" class="nav-item">
                        <i class="bi bi-clock-history"></i>
                        <span>History</span>
                    </a>

                    <a href="#" class="nav-item">
                        <i class="bi bi-heart"></i>
                        <span>Favorites</span>
                    </a>
                </div>

                <div class="nav-section">
                    <div class="nav-section-heading">
                        <span class="nav-label">LIBRARY</span>

                        <button class="icon-button small-icon" aria-label="Add collection">
                            <i class="bi bi-plus-lg"></i>
                        </button>
                    </div>

                    <a href="#" class="nav-item">
                        <i class="bi bi-folder2"></i>
                        <span>Collections</span>
                    </a>
                </div>

            </nav>

            <!-- Sidebar Footer -->
            <div class="sidebar-footer">

                <a href="#" class="nav-item">
                    <i class="bi bi-gear"></i>
                    <span>Settings</span>
                </a>

                <div class="user-profile">
                    <div class="user-avatar">JD</div>

                    <div class="user-info">
                        <span class="user-name">John Doe</span>
                        <span class="user-plan">Free plan</span>
                    </div>

                    <button class="icon-button profile-menu" aria-label="Profile menu">
                        <i class="bi bi-three-dots"></i>
                    </button>
                </div>

            </div>

        </aside>


        <!-- MAIN APPLICATION -->
        <main class="main-content">

            <!-- Topbar -->
            <header class="topbar">

                <div class="topbar-left">

                    <button class="icon-button sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar">
                        <i class="bi bi-layout-sidebar"></i>
                    </button>

                    <div class="breadcrumb">
                        <span>Workspace</span>
                        <i class="bi bi-chevron-right"></i>
                        <strong>Explore</strong>
                    </div>

                </div>

                <div class="topbar-right">

                    <button class="icon-button" aria-label="Notifications">
                        <i class="bi bi-bell"></i>
                    </button>

                    <a href="logout.php"><button class="upgrade-btn">
                            <i class="bi bi-stars"></i>
                            Click To Logout
                        </button></a>

                </div>

            </header>


            <!-- Main Workspace -->
            <div class="workspace">

                <!-- Page Introduction -->
                <section class="welcome-section">

                    <div class="welcome-content">
                        <span class="eyebrow">YOUR CREATIVE WORKSPACE</span>

                        <h1>What would you like to create?</h1>

                        <p>
                            Bring your ideas to life with AI-generated images.
                            Describe your vision and let creativity take over.
                        </p>
                    </div>

                </section>


                <!-- Generator -->
                <section class="generator-section">

                    <div class="section-heading">
                        <div>
                            <h2>Create an image</h2>
                            <p>Describe the image you have in mind.</p>
                        </div>
                    </div>


                    <div class="generator-panel">

                        <!-- Prompt -->
                        <div class="prompt-area">

                            <label for="imagePrompt" class="form-label">
                                Image description
                            </label>

                            <textarea id="imagePrompt" class="prompt-input" rows="5"
                                placeholder="A beautiful architectural photograph of a modern house surrounded by nature, soft morning light..."></textarea>

                            <div class="prompt-footer">

                                <button class="prompt-tool-btn" id="uploadImageBtn">
                                    <i class="bi bi-paperclip"></i>
                                    <span>Upload reference</span>
                                </button>

                                <input type="file" id="referenceUpload" accept="image/*" hidden>

                                <span class="character-count" id="characterCount">
                                    0 / 2000
                                </span>

                            </div>

                        </div>


                        <!-- Generation Settings -->
                        <div class="generator-settings">

                            <div class="setting-group">

                                <label for="aspectRatio">Aspect ratio</label>

                                <select id="aspectRatio" class="setting-select">
                                    <option value="1:1">Square (1:1)</option>
                                    <option value="16:9">Landscape (16:9)</option>
                                    <option value="9:16">Portrait (9:16)</option>
                                    <option value="4:3">Classic (4:3)</option>
                                    <option value="3:2">Photo (3:2)</option>
                                </select>

                            </div>


                            <div class="setting-group">

                                <label for="imageStyle">Visual style</label>

                                <select id="imageStyle" class="setting-select">
                                    <option value="realistic">Photorealistic</option>
                                    <option value="digital-art">Digital art</option>
                                    <option value="illustration">Illustration</option>
                                    <option value="3d">3D render</option>
                                    <option value="anime">Anime</option>
                                    <option value="minimal">Minimalist</option>
                                </select>

                            </div>


                            <div class="setting-group">

                                <label for="imageQuality">Quality</label>

                                <select id="imageQuality" class="setting-select">
                                    <option value="standard">Standard</option>
                                    <option value="high">High</option>
                                </select>

                            </div>

                        </div>


                        <!-- Generate Action -->
                        <div class="generator-actions">

                            <span class="generation-note">
                                <i class="bi bi-info-circle"></i>
                                Generation settings can be changed anytime.
                            </span>

                            <button class="generate-btn" id="generateBtn">
                                <i class="bi bi-stars"></i>
                                Generate image
                                <i class="bi bi-arrow-right"></i>
                            </button>

                        </div>

                    </div>

                </section>


                <!-- Recent Creations -->
                <section class="recent-section">

                    <div class="recent-header">

                        <div>
                            <h2>Recent creations</h2>
                            <p>Your recently generated images.</p>
                        </div>

                        <a href="#" class="view-all-link">
                            View all
                            <i class="bi bi-arrow-right"></i>
                        </a>

                    </div>


                    <div class="empty-state" id="emptyState">

                        <div class="empty-icon">
                            <i class="bi bi-image"></i>
                        </div>

                        <h3>Your creations will appear here</h3>

                        <p>
                            Start by describing an image above.
                            Your generated artwork will be saved in this space.
                        </p>

                    </div>


                    <div class="creation-grid" id="creationGrid">
                        <!-- Generated image items will be added here -->
                    </div>

                </section>

            </div>

        </main>

    </div>


    <!-- Mobile Sidebar Overlay -->
    <div class="sidebar-overlay" id="sidebarOverlay"></div>


    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <!-- Custom JS -->
    <script src="./assets/script.js"></script>

</body>

</html>