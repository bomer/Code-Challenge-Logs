# Coding Challenge - Parsing two groups of logs files

This was inspired by this blog. I didn't 100% agree with the thinking of the blog, but I was still interested in how I might tackle it.

https://carloarg02.medium.com/my-favorite-coding-question-to-give-candidates-17ea4758880c

The goal is to simulate two users days worth of logs of users hitting pages. If a user has visited more than 2 pages on both days then they are eligible. This might be my slight twist on the approach, but I thought it matched the need identified.

To this end I created a little script to seed some data in two csv's, and then parsed them to see how efficient my solution was or not. I originally created 1000 users across 10 possible pages. I later increased this number to do a load test of a million..

## My Approach.

- I thought I would use JS Maps (type not function), as these are meant to have order history saved in the primitive that things went in.
- The overall performance might be the same as just using JS objects, but this would be to more modern improvements to Object handling I believe.
- My approach is to create a map of each users page visits, setting the user in the map on their first finding, or updating the existing value with up to date page view data.
- This creates a map like {user55:{page3:5,page2:2}}
- I create this for both log file streams, and then run through the first files entries, and compare if the second set contains the same key, then getting the array lengths. If they're both > 1 then we have found a eligible user.
- I then just count the lengths of my two maps, to tell me the number of unique users, and then compare that with the eligible users list, which is only included if both days have 2 hits on it.
- My result took 2 seconds to execute, on 2x 1mil line files.

## My learnings

- This was a fun little problem. The way I seeded my data meant that I thought it useful to get each page hit quantity, even though I'm not really using it. If I increased the number of pages from 10 then it might have been more needed.
- Reading the article I found a few interesting tidbits, ensuring clarity of the goal, etc.
- One thing it somewhat ignored though was the dangers or premature optimisation potentially runing an implementation.
- I initially thought of trying arrays and objects, but I quickly assumed with a few hundred thousand items that I might run into some challenges inserting records, GC or general heap issues so I thought I'd try using Map.
- I am intereted to compare and see if this was true or if I used an array or object would I have gotten the same results.
- I did a test with a 10 mil sized files. It took 30 seconds, so if I needed to run a 100mil or a billion lines I'd need some optimisation.

## To run

Run the following two commands:

`node createdata.js`
`node index.js`

## Sample Inputs (generated)

> User708756,Page9
> User940633,Page4
> User526652,Page3
> User614952,Page7 .... etc.

## Sample output

> For a total of users on the last two days, 632286, 631850

> > Eligble Users: 60010

> real 0m2.087s
> user 0m2.148s
> sys 0m0.181s
