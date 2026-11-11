/* Quiz question sets. Each subject has 10 sets that get harder:
   Set 1 is the easiest, Set 10 the hardest. Week 1 uses Set 1, Week 2 Set 2, ...
   After Week 10, each week is a "Challenge" mix from Sets 6–10.
   a = index of the correct option (0-based). */
window.TEMPO_QUIZ = {
  levels: ["Rookie", "Rookie", "Starter", "Starter", "Varsity", "Varsity", "All-Star", "All-Star", "MVP", "MVP"],
  topics: [
    { key: "rules", name: "Rules & Signals", blurb: "Referee signals, basic rules and our SBMSA league rules.", study: "refs.html" },
    { key: "court", name: "The Court", blurb: "Every line and spot on the floor.", study: "court.html" },
    { key: "fundamentals", name: "Fundamentals", blurb: "Stances, footwork, passing, shooting and rebounding.", study: "fundamentals.html" },
    { key: "culture", name: "Team Culture", blurb: "The TEMPO creed, affirmations and our stories.", study: "culture.html" }
  ],
  sets: {
    /* ======================= RULES & SIGNALS ======================= */
    rules: [
      [ // Set 1
        { q: "A basket made from behind the 3-point line is worth…", o: ["1 point", "2 points", "3 points", "4 points"], a: 2, why: "Behind the arc = 3 points." },
        { q: "Each made free throw is worth…", o: ["1 point", "2 points", "3 points", "0 points"], a: 0, why: "Free throws are worth 1 point each." },
        { q: "How many players does each team have on the court?", o: ["4", "5", "6", "7"], a: 1, why: "Five players per team on the court." },
        { q: "The ref raises a CLOSED FIST in the air. What does that mean?", o: ["A foul was called", "A violation was called", "Timeout", "The shot is good"], a: 0, why: "A closed fist = foul. An open hand = violation." },
        { q: "The ball goes out of bounds. Who gets it?", o: ["The team that touched it last", "The team that did NOT touch it last", "Whoever grabs it first", "The home team"], a: 1, why: "The team that did not touch it last gets the ball." },
        { q: "How does the game start?", o: ["A free throw", "A jump ball in the center circle", "A coin flip", "The home team inbounds"], a: 1, why: "A jump ball in the center circle starts the game." }
      ],
      [ // Set 2
        { q: "The ref rolls her fists around each other. What was called?", o: ["Double dribble", "Traveling", "Holding", "Jump ball"], a: 1, why: "Rolling fists = traveling." },
        { q: "The ref makes a patting motion with both hands. What was called?", o: ["Pushing", "Carrying", "Illegal dribble (double dribble)", "3 seconds"], a: 2, why: "Patting the air = illegal dribble." },
        { q: "A basket made inside the 3-point line is worth…", o: ["1 point", "2 points", "3 points", "4 points"], a: 1, why: "Inside the arc = 2 points." },
        { q: "Is the sideline itself in bounds or out of bounds?", o: ["In bounds", "Out of bounds", "Only in the 4th quarter", "Only on offense"], a: 1, why: "The lines are out of bounds." },
        { q: "How many fouls before a player fouls out?", o: ["3", "4", "5", "6"], a: 2, why: "A player's 5th foul means she must leave the game." },
        { q: "The ref raises an OPEN HAND straight up. What does that mean?", o: ["Stop the clock — a violation or out of bounds", "A foul", "A 3-pointer is good", "Substitution"], a: 0, why: "An open hand stops the clock. A fist means a foul." }
      ],
      [ // Set 3
        { q: "The ref puts both hands on her hips. What foul is it?", o: ["Blocking", "Charging", "Technical", "Intentional"], a: 0, why: "Hands on hips = blocking foul by the defender." },
        { q: "The ref holds out her arm with 3 fingers sideways. What was called?", o: ["3-point try", "3 seconds in the lane", "3 fouls", "3 free throws"], a: 1, why: "Arm out with 3 fingers = 3-second violation." },
        { q: "The ref makes a T with her hands. What is it?", o: ["Timeout", "Traveling", "Technical foul", "Two shots"], a: 2, why: "A T with the hands = technical foul." },
        { q: "Both of the ref's thumbs are up. What happened?", o: ["Great play!", "Held ball (jump ball)", "Start the clock", "Basket is good"], a: 1, why: "Both thumbs up = held ball. The possession arrow decides who gets it." },
        { q: "In our league, which defense is allowed?", o: ["Zone", "Man-to-man only", "Any defense", "Full-court press all game"], a: 1, why: "SBMSA Junior League plays man-to-man only." },
        { q: "How high is the basket in our league?", o: ["8 feet", "8½ feet", "9 feet", "10 feet"], a: 3, why: "Junior League uses a 10-foot goal." }
      ],
      [ // Set 4
        { q: "What is the difference between a foul and a violation?", o: ["No difference", "A foul is illegal contact; a violation is breaking a rule like traveling", "A violation is worse", "Only coaches get violations"], a: 1, why: "Fouls are about contact. Violations are rule breaks." },
        { q: "You stop dribbling and hold the ball. What can you NOT do?", o: ["Pass", "Shoot", "Pivot", "Start dribbling again"], a: 3, why: "Dribbling again after you stop is a double dribble." },
        { q: "When inbounding, you must pass the ball in within…", o: ["3 seconds", "5 seconds", "10 seconds", "No limit"], a: 1, why: "You have 5 seconds to inbound." },
        { q: "How long is each quarter in our league?", o: ["6 minutes", "8 minutes", "10 minutes", "12 minutes"], a: 3, why: "Four 12-minute quarters with a running clock." },
        { q: "How many timeouts does each team get per game in our league?", o: ["2", "3", "4", "Unlimited"], a: 2, why: "4 per game, no more than 2 in each half." },
        { q: "The ref puts her hand behind her head. What was called?", o: ["Timeout", "Player-control foul (like a charge)", "3-pointer is good", "Substitution"], a: 1, why: "Hand behind the head = player-control foul by the player with the ball." }
      ],
      [ // Set 5
        { q: "You're fouled while shooting a 2-point shot and you MISS. How many free throws?", o: ["0", "1", "2", "3"], a: 2, why: "Missed 2-point try + foul = 2 free throws." },
        { q: "You're fouled while shooting and the shot GOES IN. What happens?", o: ["Basket doesn't count", "Basket counts + 1 free throw (and-one)", "3 free throws", "Other team's ball"], a: 1, why: "And-one! The basket counts plus 1 free throw." },
        { q: "You're fouled shooting a 3-pointer and you miss. How many free throws?", o: ["1", "2", "3", "0"], a: 2, why: "Missed 3-point try + foul = 3 free throws." },
        { q: "In our league, when does a team start shooting 2 bonus free throws on every foul?", o: ["On the other team's 5th team foul of the quarter", "On the 10th foul of the game", "Never", "On every foul"], a: 0, why: "SBMSA: 2 free throws starting with the 5th team foul of each quarter." },
        { q: "In our league, who plays the whole first quarter?", o: ["The best players", "The starting five", "Everyone, with lots of subs", "Whoever arrives first"], a: 1, why: "The starting five play the full 1st quarter; the other five play the 2nd." },
        { q: "What is the least amount every player plays in an SBMSA game?", o: ["1 quarter", "1.5 quarters", "2 quarters", "The whole game"], a: 1, why: "Every player plays at least 1.5 quarters." }
      ],
      [ // Set 6
        { q: "Both of the ref's arms go up with 3 fingers. What does it mean?", o: ["3 seconds", "The 3-pointer is good", "3 fouls", "3 timeouts left"], a: 1, why: "Both arms up with 3 fingers = made 3-pointer." },
        { q: "The ref crosses her arms in an X over her head. What was called?", o: ["Intentional foul", "Timeout", "Traveling", "End of the game"], a: 0, why: "Crossed arms over the head = intentional foul." },
        { q: "The ref grabs one wrist with her other hand. What foul?", o: ["Pushing", "Holding", "Blocking", "Charging"], a: 1, why: "Grasping the wrist = holding." },
        { q: "The ref chops one wrist with the other hand. What foul?", o: ["Illegal use of hands (reaching/slapping)", "Traveling", "Holding", "Technical"], a: 0, why: "Striking the wrist = illegal use of hands." },
        { q: "The ref pushes both hands forward. What foul?", o: ["Blocking", "Pushing", "Holding", "Intentional"], a: 1, why: "Both palms pushing forward = pushing." },
        { q: "The ref chops her arm down. What does it mean?", o: ["Foul", "Start the clock", "Stop the clock", "Game over"], a: 1, why: "A chop down = start the clock." }
      ],
      [ // Set 7
        { q: "We bring the ball over half court, then our dribbler goes back across the half-court line. What happens?", o: ["Nothing", "Backcourt violation — other team's ball", "Jump ball", "Free throws"], a: 1, why: "Once in the frontcourt, going back over half court is a backcourt violation." },
        { q: "You catch the ball with a jump stop, then switch which foot you pivot on. What is it?", o: ["Legal", "Traveling", "Double dribble", "Foul"], a: 1, why: "Once you pick a pivot foot, changing it is traveling." },
        { q: "Our teammate stays in the paint for 4 seconds while we have the ball. What is it?", o: ["Legal", "3-second violation", "Foul", "Jump ball"], a: 1, why: "Offensive players can't stay in the paint for more than 3 seconds." },
        { q: "Two players grab the ball at the same time and the ref gives thumbs up. Who gets the ball?", o: ["The taller player", "The team the possession arrow points to", "The home team", "The team that's losing"], a: 1, why: "Held ball: the possession arrow decides." },
        { q: "Last minute of the game, we're losing by 4. Can we guard the ball handler in her backcourt?", o: ["Yes — we're not ahead by 10 or more", "No, never", "Only if Coach yells", "Only after a timeout"], a: 0, why: "In the last 60 seconds, a team that isn't ahead by 10+ may defend the backcourt." },
        { q: "A defender slides in front of a driver AFTER the driver has already jumped. What is likely called?", o: ["Charging", "Blocking", "Traveling", "Nothing"], a: 1, why: "The defender must be set before the offensive player leaves the floor — late = blocking." }
      ],
      [ // Set 8
        { q: "The other team leads by 12 with 45 seconds left. Can THEY press us in the backcourt?", o: ["Yes", "No — they're ahead by 10 or more", "Only in overtime", "Only on free throws"], a: 1, why: "A team ahead by 10 or more may not defend the backcourt, even in the last 60 seconds." },
        { q: "A team plays zone defense for the first time in the game. What happens?", o: ["Technical foul", "Warning", "Ejection", "Nothing ever"], a: 1, why: "First time breaking a special rule = warning; after that = technical." },
        { q: "In our league, a technical foul gives the other team…", o: ["1 free throw", "2 free throws plus the ball", "3 points", "Nothing"], a: 1, why: "SBMSA technical = 2 free throws + possession." },
        { q: "It's the other team's 5th team foul of the 2nd quarter, not on a shot. What do we get?", o: ["Inbound only", "2 free throws", "1 free throw", "3 free throws"], a: 1, why: "From the 5th team foul each quarter, we shoot 2." },
        { q: "It's the other team's 3rd team foul of the quarter, not on a shot. What do we get?", o: ["2 free throws", "We inbound the ball (no free throws)", "1 free throw", "A jump ball"], a: 1, why: "Not in the bonus yet, so we just inbound." },
        { q: "A regular-season game is still tied after one overtime. What happens?", o: ["Another overtime", "Free-throw contest", "The game ends in a tie", "Coin flip"], a: 2, why: "Regular season: one 2-minute OT, then the game can end in a tie." }
      ],
      [ // Set 9
        { q: "Your foot is on the 3-point line, you're fouled, and the shot goes in. What's the result?", o: ["3 points + 1 free throw", "2 points + 1 free throw", "2 points only", "3 free throws"], a: 1, why: "Touching the line = 2-point shot, and-one = 1 free throw." },
        { q: "The ball handler runs into a defender who was already set. The shot goes in. What happens?", o: ["Basket counts", "Player-control foul — no basket, defense gets the ball", "Free throws", "Jump ball"], a: 1, why: "A player-control foul by the shooter cancels the basket." },
        { q: "A defender leaves her player to double-team someone WITHOUT the ball on the wing. Allowed?", o: ["Yes", "No — you can only double-team the player with the ball", "Only in the 4th quarter", "Only in the backcourt"], a: 1, why: "SBMSA: double-teams only on the ball handler." },
        { q: "Before the other team inbounds, our defense must…", o: ["Run to the paint", "Set up man-to-man", "Stand at half court", "Sit down"], a: 1, why: "The defense must set up man-to-man before the inbound." },
        { q: "A team leads by 20+ in the second half of the 4th quarter. What happens to the clock?", o: ["It stops more", "It keeps running", "The game ends", "Overtime"], a: 1, why: "Big-lead rule: the clock keeps running." },
        { q: "On a free throw, when can players in the lane spaces step into the paint?", o: ["Right away", "When the ball leaves the shooter's hands", "When it hits the rim", "Never"], a: 1, why: "Players may enter when the ball is released." }
      ],
      [ // Set 10
        { q: "A playoff game is tied after one overtime. What happens?", o: ["The game ends tied", "Keep playing 2-minute overtimes until someone wins", "Free-throw contest", "Higher seed wins"], a: 1, why: "Playoffs continue until there's a winner." },
        { q: "Our pass bounces off a DEFENDER'S leg and goes out of bounds. Whose ball?", o: ["Ours", "Theirs", "Jump ball", "Replay"], a: 0, why: "The defender touched it last, so we get the ball." },
        { q: "A team clears out four players so one can go one-on-one. In our league that is…", o: ["A great play", "Not allowed — warning, then technical", "Only allowed in overtime", "Worth 3 points"], a: 1, why: "Isolation plays aren't allowed in SBMSA." },
        { q: "How many conduct technical fouls on one person mean ejection?", o: ["1", "2", "3", "5"], a: 1, why: "Two conduct technicals = ejection." },
        { q: "In the last minute of the 2nd quarter, the clock stops…", o: ["Never", "Only for timeouts", "On every whistle", "Only for free throws"], a: 2, why: "Last minute of the 2nd and 4th quarters: the clock stops on every whistle." },
        { q: "A shooter jumps from behind the arc and lands inside it. The shot goes in. Points?", o: ["2", "3", "1", "0"], a: 1, why: "Where you jump from decides: behind the arc = 3." }
      ]
    ],

    /* ======================= THE COURT ======================= */
    court: [
      [ // Set 1
        { q: "What do we call the painted rectangle in front of the basket?", o: ["The arc", "The paint", "The wing", "The backcourt"], a: 1, why: "The paint is also called the lane or the key." },
        { q: "The long lines on the sides of the court are the…", o: ["Baselines", "Sidelines", "Free-throw lines", "Half-court lines"], a: 1, why: "Sidelines run the long way." },
        { q: "The lines at each end of the court, behind the baskets, are the…", o: ["Baselines (end lines)", "Sidelines", "Elbows", "Arcs"], a: 0, why: "Baselines are also called end lines." },
        { q: "Where does the opening jump ball happen?", o: ["Free-throw line", "Center circle", "Under the basket", "The corner"], a: 1, why: "The jump ball starts in the center circle." },
        { q: "The line that splits the court in two is the…", o: ["Baseline", "Half-court line", "Free-throw line", "3-point line"], a: 1, why: "The half-court line splits the court." },
        { q: "The big curved line around the basket is the…", o: ["Free-throw line", "Paint", "3-point line", "Baseline"], a: 2, why: "The 3-point line (the arc)." }
      ],
      [ // Set 2
        { q: "Where are the elbows?", o: ["Where the free-throw line meets the sides of the paint", "In the corners", "At half court", "Under the basket"], a: 0, why: "The elbows are the corners at each end of the free-throw line." },
        { q: "The small squares on the sides of the paint, close to the basket, are the…", o: ["Elbows", "Blocks", "Wings", "Corners"], a: 1, why: "Those are the blocks." },
        { q: "Where is the free-throw line?", o: ["At half court", "At the top of the paint", "Under the basket", "In the corner"], a: 1, why: "The free-throw line is the short line at the top of the paint." },
        { q: "If you step ON the sideline while holding the ball, you are…", o: ["In bounds", "Out of bounds", "Fouled", "In the paint"], a: 1, why: "The line itself is out of bounds." },
        { q: "Another name for the paint is…", o: ["The lane", "The wing", "The arc", "The corner"], a: 0, why: "Paint, lane and key all mean the same area." },
        { q: "On a layup, where do you aim on the backboard?", o: ["The bottom of the rim", "The top corner of the small square", "The middle of the big rectangle", "Anywhere"], a: 1, why: "Aim for the top corner of the small square." }
      ],
      [ // Set 3
        { q: "The half of the court with the basket we're attacking is the…", o: ["Backcourt", "Frontcourt", "Short corner", "Bench"], a: 1, why: "Frontcourt = where we try to score." },
        { q: "The half of the court we are defending is our…", o: ["Frontcourt", "Backcourt", "Paint", "Wing"], a: 1, why: "Backcourt = the other half." },
        { q: "The wings are…", o: ["On each side, between the corner and the top of the key", "Under the basket", "Behind the bench", "At half court"], a: 0, why: "Wings are on the sides, near the 3-point line." },
        { q: "Where are the corners?", o: ["Near the baseline and sideline, outside the 3-point line", "Inside the paint", "At the top of the key", "At half court"], a: 0, why: "Corners are where baseline and sideline meet, outside the arc." },
        { q: "Where is the top of the key?", o: ["Under the basket", "At the top of the free-throw circle, middle of the floor", "In the corner", "At half court"], a: 1, why: "The top of the key is the top of the free-throw circle." },
        { q: "The circle around the free-throw line is the…", o: ["Center circle", "Free-throw circle", "Arc", "Block"], a: 1, why: "The free-throw circle." }
      ],
      [ // Set 4
        { q: "Where is the low post?", o: ["Near the blocks, close to the basket", "At half court", "Near the free-throw line", "Behind the arc"], a: 0, why: "Low post = near the blocks." },
        { q: "Where is the high post?", o: ["In the corner", "Near the free-throw line and elbows", "Under the basket", "In the backcourt"], a: 1, why: "High post = around the free-throw line." },
        { q: "Where is the short corner?", o: ["Top of the key", "Along the baseline, between the paint and the corner", "Half court", "Behind the backboard"], a: 1, why: "Short corner: on the baseline, inside the 3-point line." },
        { q: "What are the lane spaces used for?", o: ["Sitting on the bench", "Lining up for free throws", "Starting the game", "Timeouts"], a: 1, why: "Players line up in the lane spaces during free throws." },
        { q: "If your foot is ON the 3-point line when you shoot, the basket is worth…", o: ["1", "2", "3", "4"], a: 1, why: "Touching the line = inside = 2 points." },
        { q: "Which is closer to the basket?", o: ["High post", "Low post", "Top of the key", "Half court"], a: 1, why: "Low post is near the blocks, right by the basket." }
      ],
      [ // Set 5
        { q: "Coach yells \"Flash to the elbow!\" Where do you go?", o: ["The corner", "Where the free-throw line meets the paint", "Under the basket", "Half court"], a: 1, why: "The elbows are at the ends of the free-throw line." },
        { q: "Coach says \"Post up on the block.\" Where do you set up?", o: ["Next to the paint, close to the basket", "At the top of the key", "In the backcourt", "On the sideline"], a: 0, why: "The block is by the paint near the basket." },
        { q: "Our point guard usually starts the offense from…", o: ["The corner", "The top of the key", "The block", "The baseline"], a: 1, why: "From the top of the key she can see the whole floor." },
        { q: "Which spot is OUTSIDE the 3-point line?", o: ["Block", "Elbow", "Wing", "Short corner"], a: 2, why: "The wing is near or behind the 3-point line." },
        { q: "Which spot is INSIDE the 3-point line?", o: ["Corner", "Wing", "Short corner", "Top of the key"], a: 2, why: "The short corner is on the baseline but inside the arc." },
        { q: "How many elbows are there around one basket?", o: ["1", "2", "3", "4"], a: 1, why: "Left elbow and right elbow." }
      ],
      [ // Set 6
        { q: "How many blocks are there around one basket?", o: ["1", "2", "4", "6"], a: 1, why: "One on each side of the paint." },
        { q: "On a free throw, who gets the lane spaces closest to the basket?", o: ["The shooting team", "The defense", "Nobody", "The coaches"], a: 1, why: "The defense gets the spots closest to the basket." },
        { q: "How far is the free-throw line for SBMSA Junior girls?", o: ["10 feet", "13 feet", "15 feet", "19 feet"], a: 1, why: "13 feet — closer than the 15-foot painted line." },
        { q: "Which line can't you take the ball back over after bringing it up?", o: ["Free-throw line", "Half-court line", "3-point line", "Baseline"], a: 1, why: "Going back over half court is a backcourt violation." },
        { q: "After the other team scores, we inbound from…", o: ["The sideline at half court", "Behind the baseline under the basket they scored on", "The free-throw line", "Anywhere"], a: 1, why: "After a made basket, inbound from the baseline at that end." },
        { q: "Which spot is on the baseline AND outside the 3-point line?", o: ["Short corner", "Corner", "Block", "Elbow"], a: 1, why: "The corner." }
      ],
      [ // Set 7
        { q: "To get open on the wing with a V-cut, you…", o: ["Stand still and wave", "Walk your defender toward the basket, then explode out to the wing", "Run to half court", "Sit in the paint"], a: 1, why: "In then out — that's a V-cut." },
        { q: "The defense crowds into the paint. Which sneaky spot along the baseline might be open?", o: ["Short corner", "Half court", "Top of the key", "The bench"], a: 0, why: "The short corner is often open when the defense collapses." },
        { q: "You're double-teamed in the corner. Best move?", o: ["Keep dribbling into the corner", "Pivot away and pass out quickly", "Throw it at the basket", "Call for a sub"], a: 1, why: "Pivot away from the trap and pass." },
        { q: "A teammate posts up on the block with her defender behind her. Good pass?", o: ["Lob over everyone", "Bounce pass to her target hand", "Rolling pass", "No pass"], a: 1, why: "A bounce pass is great into the post." },
        { q: "You've been in the paint for 2 seconds and the ball is on the wing. What should you do?", o: ["Stay", "Step out of the paint", "Sit down", "Call timeout"], a: 1, why: "Get out before 3 seconds, then cut back in." },
        { q: "Your foot touches the sideline as you catch the ball. What happens?", o: ["Keep playing", "Out of bounds — other team's ball", "Jump ball", "Free throw"], a: 1, why: "The line is out." }
      ],
      [ // Set 8
        { q: "Why stand in the corner even without the ball?", o: ["To rest", "So the defense has to cover the whole floor and the middle opens up", "To be close to the bench", "No reason"], a: 1, why: "Spacing spreads the defense out." },
        { q: "Low post or short corner — which is closer to the sideline?", o: ["Low post", "Short corner", "Same", "Neither"], a: 1, why: "The short corner is between the paint and the corner." },
        { q: "Where is the possession arrow kept?", o: ["On the backboard", "At the scorer's table", "In the center circle", "In Coach's pocket"], a: 1, why: "Check the arrow at the scorer's table." },
        { q: "A teammate cuts from the block up to the free-throw line. Which area is she in now?", o: ["Low post", "High post", "Corner", "Backcourt"], a: 1, why: "Near the free-throw line = high post." },
        { q: "Which two spots are connected by the free-throw line?", o: ["The two blocks", "The two elbows", "The two corners", "The two wings"], a: 1, why: "The free-throw line runs elbow to elbow." },
        { q: "During the opening jump ball, where must the other players stand?", o: ["Inside the center circle", "Outside the center circle", "Under the basket", "On the bench"], a: 1, why: "Only the two jumpers are inside the circle." }
      ],
      [ // Set 9
        { q: "At halftime the teams switch baskets. Our frontcourt is now…", o: ["The same half", "The other half of the court", "Only the paint", "The bench"], a: 1, why: "Frontcourt = where our basket is, so it switches." },
        { q: "With 2 minutes left and the score tied, where do we pick up the ball handler on defense?", o: ["Full court", "At half court", "In the paint only", "Anywhere"], a: 1, why: "No backcourt defense until the last 60 seconds." },
        { q: "In the last 60 seconds we're down by 6. Where can we guard the ball handler?", o: ["Only at half court", "Anywhere, including the backcourt", "Only in the paint", "Nowhere"], a: 1, why: "A team not ahead by 10+ may press in the last 60 seconds." },
        { q: "A free throw for our team: which spaces can our players use?", o: ["The ones closest to the basket", "The spaces after the defense's first spots", "Behind the shooter only", "None"], a: 1, why: "The defense takes the spots closest to the basket; we line up next." },
        { q: "You catch the ball at the elbow facing the basket. You're in the…", o: ["Low post", "High post", "Corner", "Backcourt"], a: 1, why: "Elbow area = high post." },
        { q: "Which spot gives a good angle to bank the ball off the glass?", o: ["Straight under the basket", "The wing / block angle", "Half court", "The corner behind the backboard"], a: 1, why: "From an angle (wing, block) you can use the backboard." }
      ],
      [ // Set 10
        { q: "One foot on the 3-point line, one foot behind it. You shoot and score. Points?", o: ["3", "2", "1", "0"], a: 1, why: "Any part of the foot on the line = 2." },
        { q: "We dribble across half court, then pass back to a teammate standing in the backcourt. Result?", o: ["Legal", "Backcourt violation — other team's ball", "Jump ball", "Foul"], a: 1, why: "Once the ball is in the frontcourt, we can't send it back to the backcourt." },
        { q: "Our league free throws are shot from 13 feet. How do you know where to stand?", o: ["Always on the painted line", "The ref shows you the spot in front of the painted line", "Anywhere in the paint", "From half court"], a: 1, why: "The painted line is usually 15 ft; the ref shows the 13-ft spot." },
        { q: "Ball is on the right wing. Where's a smart spot for a cutter to receive a bounce pass close to the rim?", o: ["Left corner behind the arc", "Right block / low post", "Half court", "The bench"], a: 1, why: "A cut to the block puts you right by the basket." },
        { q: "You're holding the ball with your heel on the baseline. What happens?", o: ["Nothing", "Out of bounds — other team's ball", "Jump ball", "Two free throws"], a: 1, why: "The baseline is out of bounds too." },
        { q: "Which spot is farthest from the basket while still in the frontcourt?", o: ["Block", "Elbow", "Just inside the half-court line", "Short corner"], a: 2, why: "The frontcourt stretches all the way to half court." }
      ]
    ],

    /* ======================= FUNDAMENTALS ======================= */
    fundamentals: [
      [ // Set 1
        { q: "In triple threat, what three things can you do?", o: ["Run, jump, slide", "Shoot, pass, drive", "Dribble, dribble, dribble", "Talk, clap, cheer"], a: 1, why: "Shoot, pass, or drive." },
        { q: "What does B.E.E.F. stand for in shooting?", o: ["Bounce, Elbow, Eyes, Feet", "Balance, Eyes, Elbow, Follow-through", "Ball, Energy, Effort, Fun", "Back, Eyes, Ears, Feet"], a: 1, why: "Balance, Eyes, Elbow, Follow-through." },
        { q: "How do you finish a chest pass?", o: ["Thumbs down, palms out", "Hands on hips", "Fists closed", "Arms behind your back"], a: 0, why: "Step, push, thumbs down." },
        { q: "When a shot goes up, the FIRST step to box out is…", o: ["Watch the ball", "Find your player", "Run to half court", "Jump"], a: 1, why: "Find your player first." },
        { q: "In the ready stance, your weight is on…", o: ["Your heels", "The balls of your feet", "One foot", "Your knees"], a: 1, why: "Balls of your feet so you can move fast." },
        { q: "When dribbling, your eyes should be…", o: ["On the ball", "Up, looking at the floor and teammates", "Closed", "On the crowd"], a: 1, why: "Eyes up to see teammates and defenders." }
      ],
      [ // Set 2
        { q: "Where is the ball in triple threat?", o: ["Over your head", "Tight at your hip on your shooting side", "Bouncing", "Behind your back"], a: 1, why: "Tight at your hip, shooting hand on top." },
        { q: "A jump stop means landing…", o: ["On one foot", "On both feet at the same time", "On your toes only", "Sitting down"], a: 1, why: "Both feet at the same time." },
        { q: "Where should a bounce pass bounce?", o: ["At your own feet", "About 2/3 of the way to your teammate", "At your teammate's feet", "It shouldn't bounce"], a: 1, why: "2/3 of the way, so it arrives at her waist." },
        { q: "How do you move side to side on defense?", o: ["Cross your feet", "Slide without crossing your feet", "Hop on one foot", "Stand still and reach"], a: 1, why: "Step and slide — never cross your feet." },
        { q: "How do you grab a rebound?", o: ["One hand", "Two hands, then chin it with elbows out", "Tip it to yourself", "Kick it"], a: 1, why: "Two hands, chin it!" },
        { q: "When you pivot, your pivot foot…", o: ["Lifts up", "Stays on the floor", "Slides", "Hops"], a: 1, why: "Keep it glued to the floor." }
      ],
      [ // Set 3
        { q: "For a RIGHT-handed layup on the right side, you jump off which foot?", o: ["Right", "Left", "Both", "Doesn't matter"], a: 1, why: "Right-left-UP: jump off your left foot." },
        { q: "What does your guide hand do when you shoot?", o: ["Pushes hard", "Just guides on the side of the ball", "Waves", "Stays in your pocket"], a: 1, why: "The guide hand only guides." },
        { q: "A good crossover dribble is…", o: ["High and slow", "Low and quick, across your body", "Two-handed", "Behind your back"], a: 1, why: "Low and quick so it can't be stolen." },
        { q: "\"Ball-you-basket\" on defense means…", o: ["Stand between your player and the basket", "Stand under the basket", "Chase the ball", "Stand behind your player"], a: 0, why: "You're between your player and our basket." },
        { q: "On a jab step, what stays planted?", o: ["Your pivot foot", "Both feet", "Your hands", "Nothing"], a: 0, why: "Pivot foot stays down." },
        { q: "When boxing out, what goes against the other player?", o: ["Your hands", "Your seat and back", "Your elbows", "Your head"], a: 1, why: "Seat and back against her, wide stance." }
      ],
      [ // Set 4 — cue words
        { q: "\"Hop · catch · land on two\" is the cue for…", o: ["Layup", "Jump stop", "Box out", "Crossover"], a: 1, why: "Jump stop." },
        { q: "\"Step · push · thumbs down\" is the cue for…", o: ["Chest pass", "Shooting", "Defense", "Pivot"], a: 0, why: "Chest pass." },
        { q: "\"Find · hit · hold · go get it\" is the cue for…", o: ["Box out", "Jab step", "Layup", "Dribbling"], a: 0, why: "Box out and rebound." },
        { q: "\"Low · wide · slide · talk\" is the cue for…", o: ["Shooting", "Defensive stance", "Bounce pass", "Pivot"], a: 1, why: "Defensive stance." },
        { q: "\"Jab · read · go\" is the cue for…", o: ["Jab step", "Jump stop", "Chest pass", "Free throw"], a: 0, why: "Jab step." },
        { q: "\"Right · left · UP!\" is the footwork for…", o: ["A right-side layup", "A left-side layup", "A free throw", "A pivot"], a: 0, why: "Right-handed layup from the right side." }
      ],
      [ // Set 5 — common mistakes
        { q: "Biggest mistake in the ready stance?", o: ["Knees bent", "Standing straight with locked knees", "Hands up", "Eyes forward"], a: 1, why: "Locked knees = slow." },
        { q: "Common bounce pass mistake?", o: ["Bouncing it 2/3 of the way", "Bouncing it too close to yourself", "Stepping toward your teammate", "Thumbs down"], a: 1, why: "Too close = it arrives at her ankles." },
        { q: "Common defense mistake?", o: ["Moving your feet", "Reaching for the ball instead of moving your feet", "Talking", "Staying low"], a: 1, why: "Reaching = fouls." },
        { q: "Common jab step mistake?", o: ["A short quick jab", "A giant jab that throws off your balance", "Keeping your pivot foot down", "Reading the defender"], a: 1, why: "Keep the jab short — about one shoe length." },
        { q: "Common shooting mistake?", o: ["Elbow under the ball", "Elbow sticking out to the side", "Eyes on the rim", "Holding the follow-through"], a: 1, why: "Elbow in, under the ball." },
        { q: "Common box-out mistake?", o: ["Finding your player", "Watching the ball instead of finding your player", "Using your seat", "Two hands on the rebound"], a: 1, why: "Find your player first!" }
      ],
      [ // Set 6 — why it matters
        { q: "Why use a jump stop when you catch?", o: ["It looks cool", "You stay balanced and can use either foot as your pivot", "The ref requires it", "So you can dribble twice"], a: 1, why: "Balance + either foot can be the pivot." },
        { q: "Why use a bounce pass?", o: ["It's slower", "To get the ball under a defender's arms or into the post", "To waste time", "It's always better"], a: 1, why: "Great under arms and into the post." },
        { q: "Why is triple threat so powerful?", o: ["You can rest", "The defense can't guess what you'll do", "It's required", "You can't be fouled"], a: 1, why: "Shoot, pass or drive — keep them guessing." },
        { q: "Why keep your eyes up when you dribble?", o: ["To see open teammates and the defense", "To look tall", "To find the coach", "No reason"], a: 0, why: "See the floor!" },
        { q: "Why shoot with the ball on your finger pads, not your palm?", o: ["Better control and a softer touch", "It's faster to run", "So it spins backward less", "No reason"], a: 0, why: "Finger pads give control and touch." },
        { q: "Why stay low in your defensive stance?", o: ["To rest", "So you can move quickly in any direction", "To look small", "To trip players"], a: 1, why: "Low = quick." }
      ],
      [ // Set 7 — reading the defense
        { q: "You jab and your defender steps BACK. What do you do?", o: ["Shoot", "Drive", "Pass backward", "Call timeout"], a: 0, why: "She gave you space — shoot." },
        { q: "You jab and your defender DOESN'T move. What do you do?", o: ["Shoot", "Drive past her with that same foot", "Stop", "Turn around"], a: 1, why: "Drive right by her." },
        { q: "You jab and your defender jumps TOWARD the jab. What do you do?", o: ["Shoot", "Cross over and drive the other way", "Pass to the ref", "Stand still"], a: 1, why: "She overreacted — go the other way." },
        { q: "You catch the ball on the run near a defender. How should you land?", o: ["One foot then the other", "Jump stop on both feet", "On your knees", "Keep running"], a: 1, why: "Jump stop = balanced, no travel." },
        { q: "You picked up your dribble and a defender is closing in. What now?", o: ["Dribble again", "Pivot away and pass", "Hold it over your head and freeze", "Run"], a: 1, why: "Pivot, find your teammate, pass." },
        { q: "A shot goes up while you're guarding a player. What's your job?", o: ["Watch the shot", "Find her, box out, then get the rebound", "Run down the floor", "Clap"], a: 1, why: "Find · hit · hold · go get it." }
      ],
      [ // Set 8
        { q: "A defender is reaching in while you dribble. What helps?", o: ["Dribble higher", "Stay low and protect the ball with your off arm", "Look at the ball", "Stop and hold it"], a: 1, why: "Low dribble + protect with the off arm." },
        { q: "For a LEFT-side layup, you jump off which foot and shoot with which hand?", o: ["Left foot, right hand", "Right foot, left hand", "Both feet, both hands", "Left foot, left hand"], a: 1, why: "Left side: left-right-UP, shoot left-handed." },
        { q: "Where do you aim a chest pass?", o: ["Your teammate's feet", "Your teammate's chest", "Over her head", "The backboard"], a: 1, why: "Right to her chest." },
        { q: "You're guarding the ball handler. What do you say?", o: ["Nothing", "\"Ball!\"", "\"Help!\"", "\"Shot!\""], a: 1, why: "Say \"Ball!\" so your teammates know you've got her." },
        { q: "After a jump stop, which foot can be your pivot foot?", o: ["Only the right", "Only the left", "Either one", "Neither"], a: 2, why: "Either foot — that's why the jump stop is so useful." },
        { q: "When you shoot, your follow-through looks like…", o: ["Hands on hips", "Reaching into a cookie jar on a high shelf, held until the ball hits the rim", "Waving goodbye", "Pointing at the coach"], a: 1, why: "Hold that follow-through!" }
      ],
      [ // Set 9
        { q: "You catch the ball landing right foot, then left foot (1-2 step). Which is your pivot foot?", o: ["Right (it landed first)", "Left", "Either", "Neither"], a: 0, why: "With a 1-2 stop, the first foot down is your pivot." },
        { q: "You're in triple threat and your defender is standing far away. Best choice?", o: ["Shoot if you're in range", "Turn around", "Dribble away", "Wait"], a: 0, why: "Space = shot (if it's in your range)." },
        { q: "You grab a rebound in a crowd. What do you do next?", o: ["Dribble right away", "Chin it, elbows out, pivot away from pressure", "Throw it up", "Hold it low"], a: 1, why: "Protect it first, then find an outlet." },
        { q: "In defensive stance, where are your hands?", o: ["On your knees", "One up to bother passes/shots, one out to the side", "Behind your back", "On the player"], a: 1, why: "Active hands, without reaching." },
        { q: "Defender's arms are up high and your teammate is close. Best pass?", o: ["Chest pass over her arms", "Bounce pass under her arms", "Long lob", "No pass"], a: 1, why: "Bounce under the arms." },
        { q: "Your player cuts toward the basket. What do you do on defense?", o: ["Stay where you are", "Move your feet and stay ball-you-basket", "Grab her jersey", "Watch the ball"], a: 1, why: "Move with her, stay between her and the basket." }
      ],
      [ // Set 10
        { q: "Where does the power for your shot come from?", o: ["Your arms only", "Your legs", "Your neck", "The ball"], a: 1, why: "Power comes from your legs." },
        { q: "On a layup, why jump UP instead of forward?", o: ["To look cool", "Better control and you don't fly under the basket", "It's slower", "No reason"], a: 1, why: "Up, not out — control!" },
        { q: "On a crossover, when you change direction you step with…", o: ["The same foot", "The opposite foot (the way you're going)", "Both feet", "No step"], a: 1, why: "Step with the opposite foot to explode the new way." },
        { q: "A reverse pivot means you…", o: ["Step forward around your pivot foot", "Step backward around your pivot foot", "Jump in place", "Switch pivot feet"], a: 1, why: "Front pivot = forward, reverse pivot = backward." },
        { q: "When the shot goes up, what do you yell to remind your team to box out?", o: ["\"Ball!\"", "\"Shot!\"", "\"Help!\"", "\"Time out!\""], a: 1, why: "\"Shot!\" — then find a body." },
        { q: "You catch at the elbow. What's the first thing to do?", o: ["Dribble", "Face the basket in triple threat", "Pass back right away", "Shoot without looking"], a: 1, why: "Face up in triple threat and read the defense." }
      ]
    ],

    /* ======================= TEAM CULTURE ======================= */
    culture: [
      [ // Set 1
        { q: "What does the T in TEMPO stand for?", o: ["Teamwork", "Tough Defense", "Try Hard", "Talent"], a: 1, why: "T = Tough Defense." },
        { q: "What does the E in TEMPO stand for?", o: ["Easy", "Effort — Everyone, Every Play", "Energy drinks", "Excellent shooting"], a: 1, why: "E = Effort — Everyone, Every Play." },
        { q: "What does the M in TEMPO stand for?", o: ["Motion — Never Stand Still", "Mighty", "Make every shot", "Man-to-man"], a: 0, why: "M = Motion." },
        { q: "What does the P in TEMPO stand for?", o: ["Practice", "Points", "Pass First", "Pressure"], a: 2, why: "P = Pass First." },
        { q: "What does the O in TEMPO stand for?", o: ["Offense", "Own the Boards", "On time", "Overtime"], a: 1, why: "O = Own the Boards." },
        { q: "What are our team colors?", o: ["Red and gold", "Bordeaux and Borealis Blue", "Black and white", "Green and orange"], a: 1, why: "Tempo Bordeaux and Borealis Blue!" }
      ],
      [ // Set 2
        { q: "Finish the line: \"Every stop starts with…\"", o: ["Coach", "the refs", "me", "the bench"], a: 2, why: "\"Every stop starts with me.\"" },
        { q: "Finish the line: \"Hustle is a skill. I bring it…\"", o: ["sometimes", "every time", "on game days", "when I feel like it"], a: 1, why: "\"…every time.\"" },
        { q: "Finish the line: \"Pass, cut, screen, fill — …\"", o: ["take a seat", "keep it moving", "shoot it", "slow it down"], a: 1, why: "\"…keep it moving.\"" },
        { q: "Finish the line: \"The extra pass is…\"", o: ["the best pass", "too slow", "for the coach", "a turnover"], a: 0, why: "\"The extra pass is the best pass.\"" },
        { q: "Finish the line: \"Every rebound is…\"", o: ["theirs", "OURS", "lucky", "the tall player's"], a: 1, why: "\"Every rebound is OURS.\"" },
        { q: "Coach says \"Who sets the tempo?\" The team says…", o: ["\"Coach does!\"", "\"WE DO!\"", "\"The refs!\"", "\"Nobody!\""], a: 1, why: "\"WE DO!\"" }
      ],
      [ // Set 3
        { q: "What does Tough Defense look like?", o: ["Standing tall and resting", "Low stance, active hands, talk, help, recover", "Reaching for steals", "Guarding nobody"], a: 1, why: "Low stance · active hands · talk, help, recover." },
        { q: "What does Effort look like?", o: ["Walking back on defense", "Sprint the floor, dive for loose balls, bench brings energy", "Waiting for the ball", "Only trying in games"], a: 1, why: "Effort is everyone, every play." },
        { q: "What does Motion look like?", o: ["Standing in one spot", "Move without the ball, fill the open spot, space the floor", "Dribbling a lot", "Only moving on defense"], a: 1, why: "Never stand still." },
        { q: "What does Pass First look like?", o: ["Dribble first", "Pass before you dribble, trust teammates, shoot with confidence when open", "Never shoot", "Only the point guard passes"], a: 1, why: "Trust your teammates." },
        { q: "What does Own the Boards look like?", o: ["Wait for the ball to come to you", "Find a body, box out, two hands, go get it", "Let the tall players do it", "Run to half court"], a: 1, why: "Find a body · box out · two hands." },
        { q: "How does our huddle break end?", o: ["\"Go team!\"", "\"1 · 2 · 3 — TEMPO!\"", "\"Win!\"", "Silence"], a: 1, why: "\"1 · 2 · 3 — TEMPO!\"" }
      ],
      [ // Set 4 — affirmations
        { q: "\"I belong.\" What comes next?", o: ["\"My team needs me.\"", "\"I'm the best.\"", "\"I can skip practice.\"", "\"Only stars belong.\""], a: 0, why: "I belong. My team needs me." },
        { q: "\"Mistakes make me better.\" What comes next?", o: ["\"I quit.\"", "\"Next play!\"", "\"Not my fault.\"", "\"Try again tomorrow.\""], a: 1, why: "Mistakes make me better. Next play!" },
        { q: "\"Together we are more.\" What comes next?", o: ["\"I can do it alone.\"", "\"Your best + my best.\"", "\"More players.\"", "\"Bigger uniforms.\""], a: 1, why: "Together we are more. Your best + my best." },
        { q: "\"I defend every play.\" How?", o: ["Reach for steals", "Low, loud, hands up", "Rest on defense", "Foul a lot"], a: 1, why: "I defend every play. Low, loud, hands up." },
        { q: "\"I control what I can.\" What two things are always up to me?", o: ["The refs and the score", "My effort. My attitude.", "The weather and the gym", "My teammates and coach"], a: 1, why: "I control what I can. My effort. My attitude." },
        { q: "\"I lift my teammates.\" What comes next?", o: ["\"Carry them around.\"", "\"Cheer them up, pick them up.\"", "\"Tell them what they did wrong.\"", "\"Only the best players.\""], a: 1, why: "I lift my teammates. Cheer them up, pick them up." }
      ],
      [ // Set 5 — finish the affirmation
        { q: "Finish the closing line: \"Better than…\"", o: ["everyone else", "yesterday", "my sister", "the other team"], a: 1, why: "\"Better than yesterday.\"" },
        { q: "\"I am TEMPO. We set the…\"", o: ["table", "pace", "score", "alarm"], a: 1, why: "\"We set the pace!\"" },
        { q: "\"I share the ball.\" What comes next?", o: ["\"I trust my team.\"", "\"I shoot every time.\"", "\"When I'm tired.\"", "\"Only to my friends.\""], a: 0, why: "I share the ball. I trust my team." },
        { q: "\"Every rebound is ours.\" How do we get it?", o: ["Wait for it", "Box out, two hands", "Let the tall players get it", "Run away"], a: 1, why: "Every rebound is ours. Box out, two hands." },
        { q: "How many lines are in \"I Am TEMPO\" (before the closing)?", o: ["5", "6", "8", "10"], a: 2, why: "Eight short lines — then \"Better than yesterday. I am TEMPO. We set the pace!\"" },
        { q: "Which is the FIRST line of \"I Am TEMPO\"?", o: ["I share the ball.", "I belong.", "Every rebound is ours.", "I lift my teammates."], a: 1, why: "It starts with \"I belong. My team needs me.\"" }
      ],
      [ // Set 6 — stories
        { q: "Sue Bird was famous for which TEMPO value?", o: ["Pass First", "Own the Boards", "Tough Defense", "Motion"], a: 0, why: "One of the best passers ever." },
        { q: "What happened to Michael Jordan as a high school sophomore?", o: ["He didn't make the varsity team", "He was MVP", "He quit basketball", "He was too tall"], a: 0, why: "He played JV — and used it as fuel." },
        { q: "How tall was Muggsy Bogues, the shortest player in NBA history?", o: ["4'11\"", "5'3\"", "5'9\"", "6'0\""], a: 1, why: "5 feet 3 inches." },
        { q: "What did Tamika Catchings face growing up?", o: ["Hearing loss and being teased", "She couldn't run", "She never played basketball", "She was too tall"], a: 0, why: "She wore hearing aids and worked harder than anyone." },
        { q: "What did Wilma Rudolph have to wear as a little girl?", o: ["Glasses", "A metal leg brace after polio", "A cast on her arm", "A helmet"], a: 1, why: "Then she won 3 Olympic gold medals!" },
        { q: "Which small college did Stephen Curry attend?", o: ["Davidson", "Duke", "UConn", "Stanford"], a: 0, why: "The big schools didn't want him — Davidson did." }
      ],
      [ // Set 7 — more stories
        { q: "Becky Hammon was the first woman to be…", o: ["An NBA referee", "A full-time NBA assistant coach", "An NBA owner", "An NBA announcer"], a: 1, why: "With the San Antonio Spurs." },
        { q: "Jim Abbott was born without a right hand. What did he do?", o: ["Became a Major League pitcher and threw a no-hitter", "Quit sports", "Became a referee", "Only played video games"], a: 0, why: "He found his own way." },
        { q: "Bethany Hamilton is a…", o: ["Basketball coach", "Surfer who came back after a shark attack", "Gymnast", "Runner"], a: 1, why: "She learned a new way to surf." },
        { q: "At the Tokyo Olympics, what did Simone Biles do?", o: ["Quit forever", "Stepped back to take care of herself and cheered her teammates", "Won every event", "Didn't go"], a: 1, why: "Taking care of yourself is strong." },
        { q: "Katherine Johnson was trusted to…", o: ["Fly the rocket", "Check the math for John Glenn's flight around the Earth", "Coach basketball", "Build cars"], a: 1, why: "Her math helped send astronauts to space." },
        { q: "Dawn Staley is known as a great…", o: ["Point guard and championship coach", "Swimmer", "Referee", "Singer"], a: 0, why: "She lifts everyone around her." }
      ],
      [ // Set 8 — TEMPO in action
        { q: "A teammate misses a shot and looks down. What's the TEMPO thing to do?", o: ["Ignore her", "Pick her up: \"Next play!\"", "Tell her she's bad", "Ask for a sub"], a: 1, why: "I lift my teammates." },
        { q: "You're on the bench during a game. Your job?", o: ["Rest quietly", "Bring energy and cheer", "Play on a phone", "Sleep"], a: 1, why: "Effort — the bench brings energy!" },
        { q: "You could take a hard, guarded shot or pass to a wide-open teammate under the basket. TEMPO says…", o: ["Shoot it", "Make the extra pass", "Hold the ball", "Call timeout"], a: 1, why: "Pass First." },
        { q: "You just made a turnover. What's next?", o: ["Hang your head", "Sprint back on defense — next play!", "Argue with the ref", "Walk"], a: 1, why: "Mistakes make me better." },
        { q: "A shot goes up while you're on defense. TEMPO says…", o: ["Watch it", "Find a body, box out, go get it", "Leak out", "Stand still"], a: 1, why: "Own the Boards." },
        { q: "The ref makes a call you don't agree with. What do you do?", o: ["Argue", "Control what you can — your effort and attitude — and play on", "Cry", "Walk off"], a: 1, why: "I control what I can." }
      ],
      [ // Set 9 — which value?
        { q: "Diving for a loose ball shows which value?", o: ["Effort", "Motion", "Pass First", "Own the Boards"], a: 0, why: "Hustle is a skill!" },
        { q: "Cutting to the open spot after you pass shows which value?", o: ["Tough Defense", "Motion", "Own the Boards", "Effort"], a: 1, why: "Never stand still." },
        { q: "Yelling \"Ball!\" and \"Help!\" on defense shows which value?", o: ["Tough Defense", "Pass First", "Motion", "Own the Boards"], a: 0, why: "Talk is part of tough defense." },
        { q: "Trusting your teammates with the ball shows which value?", o: ["Pass First", "Own the Boards", "Effort", "Tough Defense"], a: 0, why: "Pass before you dribble, trust teammates." },
        { q: "You feel you're not as good as others. Which affirmation helps?", o: ["I belong", "Every rebound is ours", "I share the ball", "I defend every play"], a: 0, why: "Your team needs what you bring." },
        { q: "Which story shows that taking care of yourself is strong?", o: ["Simone Biles", "Michael Jordan", "Stephen Curry", "Jim Abbott"], a: 0, why: "She stepped back, cheered her team, and came back stronger." }
      ],
      [ // Set 10 — lessons
        { q: "The lesson from Michael Jordan's story is…", o: ["Talent is all you need", "Not making a team can be the start of a comeback", "Only tall players succeed", "Quit when it's hard"], a: 1, why: "Use setbacks as fuel." },
        { q: "The lesson from Muggsy Bogues' story is…", o: ["Focus on what you can do better than anyone", "Only tall players make it", "Size is everything", "Never pass"], a: 0, why: "Speed, defense, passing — his superpowers." },
        { q: "The lesson from Katherine Johnson's story is…", o: ["Work alone", "Big goals need a whole team, and every job matters", "Math is boring", "Only astronauts matter"], a: 1, why: "Every role counts." },
        { q: "The lesson from Jim Abbott's story is…", o: ["Give up", "Find your own way — there's more than one way to do something great", "Only one way works", "Copy others"], a: 1, why: "Be creative!" },
        { q: "The lesson from Wilma Rudolph's story is…", o: ["Small efforts every day add up to something amazing", "Luck is everything", "Rest is best", "Doctors are always right"], a: 0, why: "Daily work = big results." },
        { q: "The lesson from Becky Hammon's story is…", o: ["Others decide how far you go", "Your effort and attitude decide how far you go", "Only drafted players succeed", "Coaching is easy"], a: 1, why: "Control what you can." }
      ]
    ]
  }
};
