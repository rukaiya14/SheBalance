// Dashboard JavaScript - Clean Version
let currentStep = 1;
let userData = {};
let isVoiceActive = false;
let recognition = null;
let currentLanguage = 'en';
let isTranslated = false;

// AI Core Validation System - Essential for platform operation
let aiCoreStatus = false;
let aiValidationAttempts = 0;
let aiHeartbeatInterval = null;

// Initialize AI Core Validation
function initializeAICore() {
    console.log('🤖 Initializing AI Core System...');
    
    // Simulate AI service connection
    validateAIConnection()
        .then(() => {
            aiCoreStatus = true;
            console.log('✅ AI Core System Online');
            startAIHeartbeat();
            enablePlatformFeatures();
        })
        .catch(() => {
            aiCoreStatus = false;
            console.error('❌ AI Core System Failed');
            handleAIFailure();
        });
}

// Validate AI Connection (simulated)
function validateAIConnection() {
    return new Promise((resolve, reject) => {
        aiValidationAttempts++;
        
        // Simulate AI service validation - Always succeed for demo
        setTimeout(() => {
            // For demo purposes, AI is always available
            resolve('AI Core Connected');
        }, 500 + Math.random() * 1000); // 0.5-1.5 second delay
    });
}

// Start AI Heartbeat - Continuous validation
function startAIHeartbeat() {
    aiHeartbeatInterval = setInterval(() => {
        validateAIHeartbeat();
    }, 30000); // Check every 30 seconds
}

// Validate AI Heartbeat
function validateAIHeartbeat() {
    // Simulate AI service heartbeat - Always succeed for demo
    const heartbeatSuccess = true; // Always successful for demo
    
    if (!heartbeatSuccess) {
        console.warn('⚠️ AI Heartbeat Lost');
        aiCoreStatus = false;
        handleAIFailure();
    } else {
        console.log('💓 AI Heartbeat OK');
        aiCoreStatus = true;
        updateAIStatusIndicator();
    }
}

// Handle AI Failure - Less disruptive
function handleAIFailure() {
    console.warn('⚠️ AI Core System Issue Detected - Running in Basic Mode');
    
    // Don't disable features, just show a subtle notice
    showAILimitedNotice();
    
    // Attempt reconnection in background
    setTimeout(() => {
        if (aiValidationAttempts < 3) {
            console.log('🔄 Background AI Core Reconnection...');
            initializeAICore();
        }
    }, 10000); // Try again in 10 seconds
}

// Show subtle AI limited notice instead of blocking modal
function showAILimitedNotice() {
    // Remove existing notice
    const existingNotice = document.querySelector('.ai-limited-notice');
    if (existingNotice) {
        existingNotice.remove();
    }
    
    const notice = document.createElement('div');
    notice.className = 'ai-limited-notice';
    notice.innerHTML = `
        <div class="notice-content">
            <i class="fas fa-info-circle"></i>
            <span>Running in basic mode - AI features connecting...</span>
            <button class="notice-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(notice);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notice.parentElement) {
            notice.remove();
        }
    }, 5000);
}

// Enable Platform Features (when AI is available)
function enablePlatformFeatures() {
    // Remove any AI dependency overlays
    const aiOverlay = document.querySelector('.ai-dependency-overlay');
    if (aiOverlay) {
        aiOverlay.remove();
    }
    
    // Enable all interactive elements
    const interactiveElements = document.querySelectorAll('button, input, select, textarea');
    interactiveElements.forEach(element => {
        element.disabled = false;
        element.style.opacity = '1';
        element.style.pointerEvents = 'auto';
        element.title = '';
    });
    
    console.log('✅ Platform Features Enabled - AI Core Active');
}

// Disable Platform Features (when AI is unavailable) - Less restrictive
function disablePlatformFeatures() {
    // Only disable non-essential interactive elements
    const nonEssentialElements = document.querySelectorAll('.btn-apply, .enrollment-btn');
    nonEssentialElements.forEach(element => {
        element.disabled = true;
        element.style.opacity = '0.7';
        element.title = 'AI services connecting...';
    });
    
    console.log('🔒 Some Platform Features Limited - AI Core Connecting');
}

// Show AI Dependency Notice
function showAIDependencyNotice() {
    const existingOverlay = document.querySelector('.ai-dependency-overlay');
    if (existingOverlay) return;
    
    const overlay = document.createElement('div');
    overlay.className = 'ai-dependency-overlay';
    overlay.innerHTML = `
        <div class="ai-dependency-modal">
            <div class="ai-status-icon">
                <i class="fas fa-robot"></i>
            </div>
            <h3>AI Core System Required</h3>
            <p>SheBalance requires AI services to function properly. Attempting to reconnect...</p>
            <div class="ai-loading">
                <div class="loading-spinner"></div>
                <span>Connecting to AI services...</span>
            </div>
            <button class="btn-primary ai-reconnect" onclick="forceAIReconnection()">
                <i class="fas fa-sync-alt"></i>
                Retry Connection
            </button>
        </div>
    `;
    
    document.body.appendChild(overlay);
}

// Show Critical AI Error
function showCriticalAIError() {
    const overlay = document.querySelector('.ai-dependency-overlay');
    if (overlay) {
        overlay.innerHTML = `
            <div class="ai-dependency-modal critical">
                <div class="ai-status-icon error">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3>AI Services Unavailable</h3>
                <p>SheBalance cannot operate without AI integration. Please check your connection and try again.</p>
                <div class="error-details">
                    <p><strong>Error Code:</strong> AI_CORE_FAILURE</p>
                    <p><strong>Attempts:</strong> ${aiValidationAttempts}/5</p>
                </div>
                <div class="error-actions">
                    <button class="btn-primary ai-reconnect" onclick="forceAIReconnection()">
                        <i class="fas fa-sync-alt"></i>
                        Retry Connection
                    </button>
                    <button class="btn-secondary" onclick="contactSupport()">
                        <i class="fas fa-headset"></i>
                        Contact Support
                    </button>
                </div>
            </div>
        `;
    }
}

// Force AI Reconnection
function forceAIReconnection() {
    aiValidationAttempts = 0;
    console.log('🔄 Force AI Reconnection Initiated');
    
    // Update UI to show reconnection attempt
    const overlay = document.querySelector('.ai-dependency-overlay');
    if (overlay) {
        overlay.innerHTML = `
            <div class="ai-dependency-modal">
                <div class="ai-status-icon">
                    <i class="fas fa-robot"></i>
                </div>
                <h3>Reconnecting to AI Core</h3>
                <p>Please wait while we establish connection to AI services...</p>
                <div class="ai-loading">
                    <div class="loading-spinner"></div>
                    <span>Initializing AI connection...</span>
                </div>
            </div>
        `;
    }
    
    initializeAICore();
}

// Contact Support
function contactSupport() {
    showNotification('Redirecting to support...', 'info');
    // In a real implementation, this would open support chat or email
    setTimeout(() => {
        showNotification('Support contact feature would be implemented here', 'info');
    }, 1000);
}

// AI-Dependent Feature Wrapper
function requireAI(callback, featureName = 'feature') {
    if (!aiCoreStatus) {
        showNotification(`${featureName} is running in basic mode (AI services connecting...)`, 'info');
        // Still execute the callback but with a note
        callback();
        return true;
    }
    
    // Add AI processing indicator
    const aiIndicator = document.createElement('div');
    aiIndicator.className = 'ai-processing-indicator';
    aiIndicator.innerHTML = `
        <i class="fas fa-robot"></i>
        <span>AI Processing...</span>
    `;
    document.body.appendChild(aiIndicator);
    
    // Execute callback with AI processing simulation
    setTimeout(() => {
        callback();
        aiIndicator.remove();
    }, 300 + Math.random() * 500);
    
    return true;
}

// User Database System
class UserDatabase {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('shebalance_users_db') || '{}');
        this.currentUser = localStorage.getItem('shebalance_current_user') || null;
    }
    
    createUser(userData) {
        const userId = 'user_' + Date.now();
        this.users[userId] = {
            ...userData,
            id: userId,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        };
        this.saveDatabase();
        return userId;
    }
    
    getUser(userId) {
        return this.users[userId] || null;
    }
    
    updateUser(userId, updates) {
        if (this.users[userId]) {
            this.users[userId] = { ...this.users[userId], ...updates };
            this.saveDatabase();
            return true;
        }
        return false;
    }
    
    setCurrentUser(userId) {
        this.currentUser = userId;
        localStorage.setItem('shebalance_current_user', userId);
        if (this.users[userId]) {
            this.users[userId].lastLogin = new Date().toISOString();
            this.saveDatabase();
        }
    }
    
    getCurrentUser() {
        return this.currentUser ? this.getUser(this.currentUser) : null;
    }
    
    saveDatabase() {
        localStorage.setItem('shebalance_users_db', JSON.stringify(this.users));
    }
}

// Initialize database
const userDB = new UserDatabase();

// Translation Functions - Separate Hindi and English functions
// isTranslated variable already declared at the top of the file

// Dedicated Hindi translation function
function applyHindiTranslation() {
    console.log('Applying Hindi translations...');
    
    // Header greeting
    const greeting = document.querySelector('.header h1');
    if (greeting) {
        const userName = document.getElementById('userName')?.textContent || 'Rukaiya';
        greeting.innerHTML = `नमस्ते, <span id="userName">${userName}</span>!`;
        console.log('✓ Updated greeting to Hindi');
    }
    
    // Main balance heading
    const balanceHeading = document.querySelector('.balance-card h2');
    if (balanceHeading) {
        balanceHeading.textContent = 'आज का संतुलन';
        console.log('✓ Updated balance heading to Hindi');
    }
    
    // Balance labels - target each specifically
    const householdLabel = document.querySelector('.balance-item:nth-child(1) .balance-label');
    if (householdLabel) {
        householdLabel.textContent = 'घरेलू काम';
        console.log('✓ Updated household work label');
    }
    
    const careerLabel = document.querySelector('.balance-item:nth-child(2) .balance-label');
    if (careerLabel) {
        careerLabel.textContent = 'करियर समय';
        console.log('✓ Updated career time label');
    }
    
    const selfCareLabel = document.querySelector('.balance-item:nth-child(3) .balance-label');
    if (selfCareLabel) {
        selfCareLabel.textContent = 'स्व-देखभाल';
        console.log('✓ Updated self care label');
    }
    
    const progressLabel = document.querySelector('.balance-item:nth-child(4) .balance-label');
    if (progressLabel) {
        progressLabel.textContent = 'प्रगति';
        console.log('✓ Updated progress label');
    }
    
    // Statistics labels - target each specifically
    const earningsLabel = document.querySelector('.stat-card:nth-child(1) .stat-label');
    if (earningsLabel) {
        earningsLabel.textContent = 'इस महीने की कमाई';
        console.log('✓ Updated earnings label');
    }
    
    const projectsLabel = document.querySelector('.stat-card:nth-child(2) .stat-label');
    if (projectsLabel) {
        projectsLabel.textContent = 'सक्रिय परियोजनाएं';
        console.log('✓ Updated projects label');
    }
    
    const ratingLabel = document.querySelector('.stat-card:nth-child(3) .stat-label');
    if (ratingLabel) {
        ratingLabel.textContent = 'औसत रेटिंग';
        console.log('✓ Updated rating label');
    }
    
    const connectionsLabel = document.querySelector('.stat-card:nth-child(4) .stat-label');
    if (connectionsLabel) {
        connectionsLabel.textContent = 'नेटवर्क कनेक्शन';
        console.log('✓ Updated connections label');
    }
    
    // Sidebar navigation - target each link specifically
    const dashboardNav = document.querySelector('a[href="#dashboard"] span');
    if (dashboardNav) {
        dashboardNav.textContent = 'डैशबोर्ड';
        console.log('✓ Updated dashboard nav');
    }
    
    const skillsNav = document.querySelector('a[href="skills.html"] span');
    if (skillsNav) {
        skillsNav.textContent = 'मेरे कौशल';
        console.log('✓ Updated skills nav');
    }
    
    const opportunitiesNav = document.querySelector('a[href="#opportunities"] span');
    if (opportunitiesNav) {
        opportunitiesNav.textContent = 'अवसर';
        console.log('✓ Updated opportunities nav');
    }
    
    const foodNav = document.querySelector('a[href="#food-marketplace"] span');
    if (foodNav) {
        foodNav.textContent = 'खाद्य बाज़ार';
        console.log('✓ Updated food marketplace nav');
    }
    
    const communityNav = document.querySelector('a[href="#community"] span');
    if (communityNav) {
        communityNav.textContent = 'समुदाय';
        console.log('✓ Updated community nav');
    }
    
    const progressNav = document.querySelector('a[href="progress.html"] span');
    if (progressNav) {
        progressNav.textContent = 'प्रगति';
        console.log('✓ Updated progress nav');
    }
    
    const settingsNav = document.querySelector('a[href="#settings"] span');
    if (settingsNav) {
        settingsNav.textContent = 'सेटिंग्स';
        console.log('✓ Updated settings nav');
    }
    
    const logoutNav = document.querySelector('.sidebar-footer a span');
    if (logoutNav) {
        logoutNav.textContent = 'लॉग आउट';
        console.log('✓ Updated logout nav');
    }
    
    // Voice command button
    const voiceText = document.querySelector('.voice-text');
    if (voiceText) {
        voiceText.textContent = 'आवाज़ कमांड';
        console.log('✓ Updated voice command text');
    }
    
    // Section headers - already working but let's ensure they're set
    const focusHeader = document.querySelector('.focus-card h3');
    if (focusHeader) {
        focusHeader.textContent = '🎯 आज का फोकस';
        console.log('✓ Updated focus header');
    }
    
    const opportunitiesHeader = document.querySelector('.opportunities-card h3');
    if (opportunitiesHeader) {
        opportunitiesHeader.textContent = '🔥 गर्म अवसर';
        console.log('✓ Updated opportunities header');
    }
    
    const foodHeader = document.querySelector('.food-card h3');
    if (foodHeader) {
        foodHeader.textContent = '🍳 खाद्य बाज़ार';
        console.log('✓ Updated food header');
    }
    
    const communityHeader = document.querySelector('.community-card h3');
    if (communityHeader) {
        communityHeader.textContent = '👥 समुदाय अपडेट';
        console.log('✓ Updated community header');
    }
    
    const progressHeader = document.querySelector('.progress-card h3');
    if (progressHeader) {
        progressHeader.textContent = '📈 आपकी विकास यात्रा';
        console.log('✓ Updated progress header');
    }
    
    // Buttons - target each specifically
    const addTaskBtn = document.querySelector('.focus-card .btn-primary');
    if (addTaskBtn) {
        addTaskBtn.textContent = 'नया कार्य जोड़ें';
        console.log('✓ Updated add task button');
    }
    
    const viewOpportunitiesBtn = document.querySelector('.opportunities-card .btn-secondary');
    if (viewOpportunitiesBtn) {
        viewOpportunitiesBtn.textContent = 'सभी अवसर देखें';
        console.log('✓ Updated view opportunities button');
    }
    
    const manageOrdersBtn = document.querySelector('.food-card .btn-primary');
    if (manageOrdersBtn) {
        manageOrdersBtn.textContent = 'ऑर्डर प्रबंधित करें';
        console.log('✓ Updated manage orders button');
    }
    
    const joinCommunityBtn = document.querySelector('.community-card .btn-secondary');
    if (joinCommunityBtn) {
        joinCommunityBtn.textContent = 'समुदाय में शामिल हों';
        console.log('✓ Updated join community button');
    }
    
    const viewProgressBtn = document.querySelector('.progress-actions .btn-secondary');
    if (viewProgressBtn) {
        viewProgressBtn.innerHTML = '<i class="fas fa-chart-line"></i> विस्तृत प्रगति देखें';
        console.log('✓ Updated view progress button');
    }
    
    // Translate task descriptions
    const taskLabels = document.querySelectorAll('.focus-item label');
    const hindiTasks = [
        'कढ़ाई कोर्स मॉड्यूल 3 पूरा करें',
        '2 फैशन डिज़ाइनर पदों के लिए आवेदन करें',
        'मेंटर सुनीता देवी से जुड़ें',
        'नई पोर्टफोलियो तस्वीरें अपलोड करें'
    ];
    taskLabels.forEach((label, index) => {
        if (hindiTasks[index]) {
            label.textContent = hindiTasks[index];
            console.log('✓ Updated task', index, 'to Hindi');
        }
    });
    
    // Translate job titles and descriptions
    const jobTitles = document.querySelectorAll('.opportunity-info h4');
    const hindiJobTitles = [
        'फैशन डिज़ाइनर असिस्टेंट',
        'ऑफिस के लिए होम शेफ',
        'कढ़ाई प्रशिक्षक'
    ];
    jobTitles.forEach((title, index) => {
        if (hindiJobTitles[index]) {
            title.textContent = hindiJobTitles[index];
            console.log('✓ Updated job title', index, 'to Hindi');
        }
    });
    
    const jobDescriptions = document.querySelectorAll('.opportunity-info p');
    const hindiJobDescriptions = [
        '₹18,000/महीना • रिमोट',
        '₹800/दिन • नजदीक',
        '₹1,000/क्लास • ऑनलाइन'
    ];
    jobDescriptions.forEach((desc, index) => {
        if (hindiJobDescriptions[index]) {
            desc.textContent = hindiJobDescriptions[index];
            console.log('✓ Updated job description', index, 'to Hindi');
        }
    });
    
    // Translate match scores
    const matchScores = document.querySelectorAll('.match-score');
    const hindiMatchScores = ['85% मैच', '92% मैच', '88% मैच'];
    matchScores.forEach((score, index) => {
        if (hindiMatchScores[index]) {
            score.textContent = hindiMatchScores[index];
            console.log('✓ Updated match score', index, 'to Hindi');
        }
    });
    
    // Translate Apply buttons
    const applyButtons = document.querySelectorAll('.btn-apply');
    applyButtons.forEach((btn) => {
        if (btn.textContent.trim() === 'Apply') {
            btn.textContent = 'आवेदन करें';
            console.log('✓ Updated apply button to Hindi');
        }
    });
    
    // Translate food order items
    const orderNames = document.querySelectorAll('.order-name');
    const hindiOrderNames = [
        'राजमा चावल (5 पोर्शन)',
        'घर का बना कुकीज़ (2 दर्जन)'
    ];
    orderNames.forEach((name, index) => {
        if (hindiOrderNames[index]) {
            name.textContent = hindiOrderNames[index];
            console.log('✓ Updated order name', index, 'to Hindi');
        }
    });
    
    // Translate order status
    const orderStatuses = document.querySelectorAll('.order-status');
    orderStatuses.forEach((status) => {
        if (status.textContent.trim() === 'Preparing') {
            status.textContent = 'तैयार कर रहे हैं';
        } else if (status.textContent.trim() === 'Delivered') {
            status.textContent = 'डिलीवर किया गया';
        }
        console.log('✓ Updated order status to Hindi');
    });
    
    // Translate community updates
    const communityUpdates = document.querySelectorAll('.update-content p');
    const hindiUpdates = [
        '<strong>सुनीता देवी</strong> ने एक नई कढ़ाई तकनीक साझा की',
        '<strong>मीरा पटेल</strong> ने बैलेंस बॉस अवार्ड जीता!',
        '<strong>काव्या सिंह</strong> ने एक नया कैटरिंग बिजनेस शुरू किया'
    ];
    communityUpdates.forEach((update, index) => {
        if (hindiUpdates[index]) {
            update.innerHTML = hindiUpdates[index];
            console.log('✓ Updated community update', index, 'to Hindi');
        }
    });
    
    // Translate time stamps
    const timeStamps = document.querySelectorAll('.update-time');
    const hindiTimeStamps = ['2 घंटे पहले', '5 घंटे पहले', '1 दिन पहले'];
    timeStamps.forEach((time, index) => {
        if (hindiTimeStamps[index]) {
            time.textContent = hindiTimeStamps[index];
            console.log('✓ Updated time stamp', index, 'to Hindi');
        }
    });
    
    // Translate stat change indicators
    const statChanges = document.querySelectorAll('.stat-change');
    const hindiStatChanges = [
        '+25% पिछले महीने से',
        '+3 इस सप्ताह नए',
        '+0.2 इस महीने',
        '+5 इस सप्ताह'
    ];
    statChanges.forEach((change, index) => {
        if (hindiStatChanges[index]) {
            change.textContent = hindiStatChanges[index];
            console.log('✓ Updated stat change', index, 'to Hindi');
        }
    });
    
    // Food marketplace stats labels
    const activeOrdersLabel = document.querySelector('.food-stat:nth-child(1) .food-label');
    if (activeOrdersLabel) {
        activeOrdersLabel.textContent = 'सक्रिय ऑर्डर';
        console.log('✓ Updated active orders label');
    }
    
    const thisWeekLabel = document.querySelector('.food-stat:nth-child(2) .food-label');
    if (thisWeekLabel) {
        thisWeekLabel.textContent = 'इस सप्ताह';
        console.log('✓ Updated this week label');
    }
    
    const ratingFoodLabel = document.querySelector('.food-stat:nth-child(3) .food-label');
    if (ratingFoodLabel) {
        ratingFoodLabel.textContent = 'रेटिंग';
        console.log('✓ Updated food rating label');
    }
    
    // Recent orders header
    const recentOrdersHeader = document.querySelector('.recent-orders h4');
    if (recentOrdersHeader) {
        recentOrdersHeader.textContent = 'हाल के ऑर्डर';
        console.log('✓ Updated recent orders header');
    }
    
    // Progress metrics
    const skillsImprovedLabel = document.querySelector('.metric:nth-child(1) .metric-label');
    if (skillsImprovedLabel) {
        skillsImprovedLabel.textContent = 'कौशल में सुधार';
        console.log('✓ Updated skills improved label');
    }
    
    const incomeGrowthLabel = document.querySelector('.metric:nth-child(2) .metric-label');
    if (incomeGrowthLabel) {
        incomeGrowthLabel.textContent = 'आय वृद्धि';
        console.log('✓ Updated income growth label');
    }
    
    const timeOptimizedLabel = document.querySelector('.metric:nth-child(3) .metric-label');
    if (timeOptimizedLabel) {
        timeOptimizedLabel.textContent = 'समय अनुकूलित';
        console.log('✓ Updated time optimized label');
    }
    
    console.log('Hindi translation completed!');
}

function applyEnglishTranslation() {
    console.log('Applying English translations...');
    
    // Header greeting
    const greeting = document.querySelector('.header h1');
    if (greeting) {
        const userName = document.getElementById('userName')?.textContent || 'Rukaiya';
        greeting.innerHTML = `Hello, <span id="userName">${userName}</span>!`;
        console.log('✓ Updated greeting to English');
    }
    
    // Main balance heading
    const balanceHeading = document.querySelector('.balance-card h2');
    if (balanceHeading) {
        balanceHeading.textContent = "Today's Balance";
        console.log('✓ Updated balance heading to English');
    }
    
    // Balance labels - target each specifically
    const householdLabel = document.querySelector('.balance-item:nth-child(1) .balance-label');
    if (householdLabel) {
        householdLabel.textContent = 'Household Work';
    }
    
    const careerLabel = document.querySelector('.balance-item:nth-child(2) .balance-label');
    if (careerLabel) {
        careerLabel.textContent = 'Career Time';
    }
    
    const selfCareLabel = document.querySelector('.balance-item:nth-child(3) .balance-label');
    if (selfCareLabel) {
        selfCareLabel.textContent = 'Self Care';
    }
    
    const progressLabel = document.querySelector('.balance-item:nth-child(4) .balance-label');
    if (progressLabel) {
        progressLabel.textContent = 'Progress';
    }
    
    // Statistics labels - target each specifically
    const earningsLabel = document.querySelector('.stat-card:nth-child(1) .stat-label');
    if (earningsLabel) {
        earningsLabel.textContent = "This Month's Earnings";
    }
    
    const projectsLabel = document.querySelector('.stat-card:nth-child(2) .stat-label');
    if (projectsLabel) {
        projectsLabel.textContent = 'Active Projects';
    }
    
    const ratingLabel = document.querySelector('.stat-card:nth-child(3) .stat-label');
    if (ratingLabel) {
        ratingLabel.textContent = 'Average Rating';
    }
    
    const connectionsLabel = document.querySelector('.stat-card:nth-child(4) .stat-label');
    if (connectionsLabel) {
        connectionsLabel.textContent = 'Network Connections';
    }
    
    // Sidebar navigation - target each link specifically
    const dashboardNav = document.querySelector('a[href="#dashboard"] span');
    if (dashboardNav) {
        dashboardNav.textContent = 'Dashboard';
    }
    
    const skillsNav = document.querySelector('a[href="skills.html"] span');
    if (skillsNav) {
        skillsNav.textContent = 'My Skills';
    }
    
    const opportunitiesNav = document.querySelector('a[href="#opportunities"] span');
    if (opportunitiesNav) {
        opportunitiesNav.textContent = 'Opportunities';
    }
    
    const foodNav = document.querySelector('a[href="#food-marketplace"] span');
    if (foodNav) {
        foodNav.textContent = 'Food Marketplace';
    }
    
    const communityNav = document.querySelector('a[href="#community"] span');
    if (communityNav) {
        communityNav.textContent = 'Community';
    }
    
    const progressNav = document.querySelector('a[href="progress.html"] span');
    if (progressNav) {
        progressNav.textContent = 'Progress';
    }
    
    const settingsNav = document.querySelector('a[href="#settings"] span');
    if (settingsNav) {
        settingsNav.textContent = 'Settings';
    }
    
    const logoutNav = document.querySelector('.sidebar-footer a span');
    if (logoutNav) {
        logoutNav.textContent = 'Logout';
    }
    
    // Voice command button
    const voiceText = document.querySelector('.voice-text');
    if (voiceText) {
        voiceText.textContent = 'Voice Command';
    }
    
    // Section headers
    const focusHeader = document.querySelector('.focus-card h3');
    if (focusHeader) {
        focusHeader.textContent = "🎯 Today's Focus";
    }
    
    const opportunitiesHeader = document.querySelector('.opportunities-card h3');
    if (opportunitiesHeader) {
        opportunitiesHeader.textContent = '🔥 Hot Opportunities';
    }
    
    const foodHeader = document.querySelector('.food-card h3');
    if (foodHeader) {
        foodHeader.textContent = '🍳 Food Marketplace';
    }
    
    const communityHeader = document.querySelector('.community-card h3');
    if (communityHeader) {
        communityHeader.textContent = '👥 Community Updates';
    }
    
    const progressHeader = document.querySelector('.progress-card h3');
    if (progressHeader) {
        progressHeader.textContent = '📈 Your Growth Journey';
    }
    
    // Buttons - target each specifically
    const addTaskBtn = document.querySelector('.focus-card .btn-primary');
    if (addTaskBtn) {
        addTaskBtn.textContent = 'Add New Task';
    }
    
    const viewOpportunitiesBtn = document.querySelector('.opportunities-card .btn-secondary');
    if (viewOpportunitiesBtn) {
        viewOpportunitiesBtn.textContent = 'View All Opportunities';
    }
    
    const manageOrdersBtn = document.querySelector('.food-card .btn-primary');
    if (manageOrdersBtn) {
        manageOrdersBtn.textContent = 'Manage Orders';
    }
    
    const joinCommunityBtn = document.querySelector('.community-card .btn-secondary');
    if (joinCommunityBtn) {
        joinCommunityBtn.textContent = 'Join Community';
    }
    
    const viewProgressBtn = document.querySelector('.progress-actions .btn-secondary');
    if (viewProgressBtn) {
        viewProgressBtn.innerHTML = '<i class="fas fa-chart-line"></i> View Detailed Progress';
    }
    
    // Restore task descriptions
    const taskLabels = document.querySelectorAll('.focus-item label');
    const englishTasks = [
        'Complete embroidery course module 3',
        'Apply to 2 fashion designer positions',
        'Connect with mentor Sunita Devi',
        'Upload new portfolio photos'
    ];
    taskLabels.forEach((label, index) => {
        if (englishTasks[index]) {
            label.textContent = englishTasks[index];
        }
    });
    
    // Restore job titles and descriptions
    const jobTitles = document.querySelectorAll('.opportunity-info h4');
    const englishJobTitles = [
        'Fashion Designer Assistant',
        'Home Chef for Office',
        'Embroidery Trainer'
    ];
    jobTitles.forEach((title, index) => {
        if (englishJobTitles[index]) {
            title.textContent = englishJobTitles[index];
        }
    });
    
    const jobDescriptions = document.querySelectorAll('.opportunity-info p');
    const englishJobDescriptions = [
        '₹18,000/month • Remote',
        '₹800/day • Nearby',
        '₹1,000/class • Online'
    ];
    jobDescriptions.forEach((desc, index) => {
        if (englishJobDescriptions[index]) {
            desc.textContent = englishJobDescriptions[index];
        }
    });
    
    // Restore match scores
    const matchScores = document.querySelectorAll('.match-score');
    const englishMatchScores = ['85% Match', '92% Match', '88% Match'];
    matchScores.forEach((score, index) => {
        if (englishMatchScores[index]) {
            score.textContent = englishMatchScores[index];
        }
    });
    
    // Restore Apply buttons
    const applyButtons = document.querySelectorAll('.btn-apply');
    applyButtons.forEach((btn) => {
        if (btn.textContent.trim() === 'आवेदन करें') {
            btn.textContent = 'Apply';
        }
    });
    
    // Restore food order items
    const orderNames = document.querySelectorAll('.order-name');
    const englishOrderNames = [
        'Rajma Chawal (5 portions)',
        'Homemade Cookies (2 dozen)'
    ];
    orderNames.forEach((name, index) => {
        if (englishOrderNames[index]) {
            name.textContent = englishOrderNames[index];
        }
    });
    
    // Restore order status
    const orderStatuses = document.querySelectorAll('.order-status');
    orderStatuses.forEach((status) => {
        if (status.textContent.trim() === 'तैयार कर रहे हैं') {
            status.textContent = 'Preparing';
        } else if (status.textContent.trim() === 'डिलीवर किया गया') {
            status.textContent = 'Delivered';
        }
    });
    
    // Restore community updates
    const communityUpdates = document.querySelectorAll('.update-content p');
    const englishUpdates = [
        '<strong>Sunita Devi</strong> shared a new embroidery technique',
        '<strong>Meera Patel</strong> won Balance Boss award!',
        '<strong>Kavya Singh</strong> started a new catering business'
    ];
    communityUpdates.forEach((update, index) => {
        if (englishUpdates[index]) {
            update.innerHTML = englishUpdates[index];
        }
    });
    
    // Restore time stamps
    const timeStamps = document.querySelectorAll('.update-time');
    const englishTimeStamps = ['2 hours ago', '5 hours ago', '1 day ago'];
    timeStamps.forEach((time, index) => {
        if (englishTimeStamps[index]) {
            time.textContent = englishTimeStamps[index];
        }
    });
    
    // Restore stat change indicators
    const statChanges = document.querySelectorAll('.stat-change');
    const englishStatChanges = [
        '+25% from last month',
        '+3 new this week',
        '+0.2 this month',
        '+5 this week'
    ];
    statChanges.forEach((change, index) => {
        if (englishStatChanges[index]) {
            change.textContent = englishStatChanges[index];
        }
    });
    
    // Food marketplace stats labels
    const activeOrdersLabel = document.querySelector('.food-stat:nth-child(1) .food-label');
    if (activeOrdersLabel) {
        activeOrdersLabel.textContent = 'Active Orders';
    }
    
    const thisWeekLabel = document.querySelector('.food-stat:nth-child(2) .food-label');
    if (thisWeekLabel) {
        thisWeekLabel.textContent = 'This Week';
    }
    
    const ratingFoodLabel = document.querySelector('.food-stat:nth-child(3) .food-label');
    if (ratingFoodLabel) {
        ratingFoodLabel.textContent = 'Rating';
    }
    
    // Recent orders header
    const recentOrdersHeader = document.querySelector('.recent-orders h4');
    if (recentOrdersHeader) {
        recentOrdersHeader.textContent = 'Recent Orders';
    }
    
    // Progress metrics
    const skillsImprovedLabel = document.querySelector('.metric:nth-child(1) .metric-label');
    if (skillsImprovedLabel) {
        skillsImprovedLabel.textContent = 'Skills Improved';
    }
    
    const incomeGrowthLabel = document.querySelector('.metric:nth-child(2) .metric-label');
    if (incomeGrowthLabel) {
        incomeGrowthLabel.textContent = 'Income Growth';
    }
    
    const timeOptimizedLabel = document.querySelector('.metric:nth-child(3) .metric-label');
    if (timeOptimizedLabel) {
        timeOptimizedLabel.textContent = 'Time Optimized';
    }
    
    console.log('English translation completed!');
}

// Main translation function that decides which direction to translate - AI Dependent
function translateToHindi() {
    // Check if AI is ready, if not, proceed anyway for translation (fallback)
    if (aiCoreStatus) {
        // Use AI-enhanced translation
        if (!requireAI(() => {
            performTranslation();
        }, 'Language Translation')) {
            return;
        }
    } else {
        // Fallback to basic translation without AI
        console.log('Using fallback translation (AI not available)');
        performTranslation();
    }
}

function performTranslation() {
    console.log('translateToHindi function called! Current state:', isTranslated);
    
    if (!isTranslated) {
        applyHindiTranslation();
        
        // Update translate button
        const translateBtn = document.getElementById('translateText');
        if (translateBtn) {
            translateBtn.textContent = 'English';
        }
        
        isTranslated = true;
        showNotification('पेज हिंदी में अनुवादित किया गया', 'success');
    } else {
        applyEnglishTranslation();
        
        // Update translate button
        const translateBtn = document.getElementById('translateText');
        if (translateBtn) {
            translateBtn.textContent = 'हिंदी में';
        }
        
        isTranslated = false;
        showNotification('Page translated back to English', 'success');
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#6366f1'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        font-family: 'Poppins', sans-serif;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 4000);
}

// Course enrollment function - AI Dependent
function enrollCourse(courseId, paymentType) {
    // Require AI for course enrollment
    if (!requireAI(() => {
        enrollCourseWithAI(courseId, paymentType);
    }, 'Course Enrollment')) {
        return;
    }
}

function enrollCourseWithAI(courseId, paymentType) {
    const courses = {
        crochet: {
            name: 'Advanced Crochet Mastery',
            fullPrice: 2999,
            emiAmount: 500,
            emiMonths: 6
        },
        tailoring: {
            name: 'Professional Tailoring',
            fullPrice: 3499,
            emiAmount: 437,
            emiMonths: 8
        },
        crossstitch: {
            name: 'Cross Stitch Artistry',
            fullPrice: 1999,
            emiAmount: 500,
            emiMonths: 4
        },
        henna: {
            name: 'Advanced Henna Techniques',
            fullPrice: 2499,
            emiAmount: 500,
            emiMonths: 5
        }
    };
    
    const course = courses[courseId];
    if (!course) return;
    
    if (paymentType === 'full') {
        // Handle full payment
        showEnrollmentModal(course, 'full');
    } else if (paymentType === 'emi') {
        // Handle EMI payment
        showEnrollmentModal(course, 'emi');
    }
}

function showEnrollmentModal(course, paymentType) {
    let modalContent = '';
    
    if (paymentType === 'full') {
        modalContent = `
            <div class="enrollment-modal">
                <div class="modal-header">
                    <h3>Enroll in ${course.name}</h3>
                    <span class="close" onclick="closeEnrollmentModal()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="payment-summary">
                        <h4>Payment Summary</h4>
                        <div class="summary-item">
                            <span>Course Fee:</span>
                            <span>₹${course.fullPrice}</span>
                        </div>
                        <div class="summary-item total">
                            <span><strong>Total Amount:</strong></span>
                            <span><strong>₹${course.fullPrice}</strong></span>
                        </div>
                    </div>
                    <div class="payment-benefits">
                        <h4>✨ Full Payment Benefits:</h4>
                        <ul>
                            <li>✅ Immediate access to all course materials</li>
                            <li>✅ Lifetime access to course content</li>
                            <li>✅ Priority support from instructors</li>
                            <li>✅ Certificate upon completion</li>
                        </ul>
                    </div>
                    <button class="btn-primary btn-large" onclick="processPayment('${course.name}', ${course.fullPrice}, 'full')">
                        <i class="fas fa-credit-card"></i>
                        Pay ₹${course.fullPrice} Now
                    </button>
                </div>
            </div>
        `;
    } else {
        modalContent = `
            <div class="enrollment-modal">
                <div class="modal-header">
                    <h3>Enroll in ${course.name}</h3>
                    <span class="close" onclick="closeEnrollmentModal()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="payment-summary">
                        <h4>EMI Payment Plan</h4>
                        <div class="summary-item">
                            <span>Course Fee:</span>
                            <span>₹${course.fullPrice}</span>
                        </div>
                        <div class="summary-item">
                            <span>EMI Amount:</span>
                            <span>₹${course.emiAmount}/month</span>
                        </div>
                        <div class="summary-item">
                            <span>Duration:</span>
                            <span>${course.emiMonths} months</span>
                        </div>
                        <div class="summary-item">
                            <span>Interest Rate:</span>
                            <span class="highlight">0% (No Interest!)</span>
                        </div>
                        <div class="summary-item total">
                            <span><strong>First EMI:</strong></span>
                            <span><strong>₹${course.emiAmount}</strong></span>
                        </div>
                    </div>
                    <div class="emi-schedule">
                        <h4>📅 EMI Schedule:</h4>
                        <div class="schedule-grid">
                            ${generateEMISchedule(course.emiAmount, course.emiMonths)}
                        </div>
                    </div>
                    <div class="payment-benefits">
                        <h4>💡 EMI Benefits:</h4>
                        <ul>
                            <li>✅ Start learning immediately with first EMI</li>
                            <li>✅ 0% interest - No extra charges</li>
                            <li>✅ Flexible payment schedule</li>
                            <li>✅ Same course benefits as full payment</li>
                        </ul>
                    </div>
                    <button class="btn-primary btn-large" onclick="processPayment('${course.name}', ${course.emiAmount}, 'emi')">
                        <i class="fas fa-calendar-check"></i>
                        Start with ₹${course.emiAmount} EMI
                    </button>
                </div>
            </div>
        `;
    }
    
    // Create and show modal
    const modal = document.createElement('div');
    modal.className = 'modal enrollment-modal-container';
    modal.innerHTML = `<div class="modal-content">${modalContent}</div>`;
    document.body.appendChild(modal);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function generateEMISchedule(emiAmount, months) {
    let schedule = '';
    const currentDate = new Date();
    
    for (let i = 1; i <= months; i++) {
        const emiDate = new Date(currentDate);
        emiDate.setMonth(currentDate.getMonth() + i);
        const dateStr = emiDate.toLocaleDateString('en-IN', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
        });
        
        schedule += `
            <div class="schedule-item">
                <span class="emi-number">EMI ${i}</span>
                <span class="emi-date">${dateStr}</span>
                <span class="emi-amount">₹${emiAmount}</span>
            </div>
        `;
    }
    
    return schedule;
}

function processPayment(courseName, amount, type) {
    // Simulate payment processing
    showNotification('Processing payment...', 'info');
    
    setTimeout(() => {
        closeEnrollmentModal();
        
        if (type === 'full') {
            showNotification(`🎉 Successfully enrolled in ${courseName}! Full payment of ₹${amount} processed.`, 'success');
        } else {
            showNotification(`🎉 Successfully enrolled in ${courseName}! First EMI of ₹${amount} processed.`, 'success');
        }
        
        // Redirect to course or show course access
        setTimeout(() => {
            showNotification('Course materials are now available in your dashboard!', 'info');
        }, 2000);
    }, 2000);
}

function closeEnrollmentModal() {
    const modal = document.querySelector('.enrollment-modal-container');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

function updateUserName(name) {
    const firstName = name.split(' ')[0];
    const userNameElement = document.getElementById('userName');
    const userNameProfileElement = document.getElementById('userNameProfile');
    
    if (userNameElement) {
        userNameElement.textContent = firstName;
    }
    if (userNameProfileElement) {
        userNameProfileElement.textContent = name;
    }
}

// Add AI Status Indicator
function addAIStatusIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'ai-status-indicator';
    indicator.id = 'aiStatusIndicator';
    indicator.innerHTML = `
        <i class="fas fa-robot"></i>
        <span>AI Core Online</span>
    `;
    document.body.appendChild(indicator);
    
    // Update indicator based on AI status
    updateAIStatusIndicator();
}

function updateAIStatusIndicator() {
    const indicator = document.getElementById('aiStatusIndicator');
    if (!indicator) return;
    
    if (aiCoreStatus) {
        indicator.className = 'ai-status-indicator';
        indicator.innerHTML = `
            <i class="fas fa-robot"></i>
            <span>AI Core Online</span>
        `;
    } else {
        indicator.className = 'ai-status-indicator offline';
        indicator.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span>AI Core Offline</span>
        `;
    }
}

// Initialize dashboard with AI dependency
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 SheBalance Platform Initializing...');
    
    // Initialize AI Core System FIRST - Platform depends on this
    initializeAICore();
    
    // Check for existing user
    let currentUser = userDB.getCurrentUser();
    
    if (!currentUser) {
        // Create default user - Rukaiya Ghadiali
        const defaultUserData = {
            fullName: "Rukaiya Ghadiali",
            location: "Mumbai, Maharashtra",
            age: "26-35",
            householdHours: "4",
            selfCareHours: "2",
            responsibilities: ["cooking", "cleaning", "childcare"],
            skills: ["embroidery", "cooking", "henna"],
            hobbies: ["reading", "gardening", "music"],
            freeTimeHours: "3",
            workingHours: ["morning", "evening"],
            incomeGoal: "15000"
        };
        
        const userId = userDB.createUser(defaultUserData);
        userDB.setCurrentUser(userId);
        currentUser = userDB.getCurrentUser();
    }
    
    if (currentUser) {
        updateUserName(currentUser.fullName);
    }
    
    // Add AI status indicator
    setTimeout(() => {
        addAIStatusIndicator();
    }, 1000);
    
    console.log('✅ Platform Initialization Complete');
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(style);