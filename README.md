![CareConsult](src/img/careconsult.svg)
[Live Site](https://ecstatic-leavitt-3a8f13.netlify.com/)

## Why CareConsult
The Covid-19 pandemic is straining healthcare systems around the globe. CareConsult was created to connect licensed volunteer health professionals with patients at home to reduce the burden on hospitals and clinics.

## Contribute 
- Create a pull request, introduce yourself through email or participate in our weekly meetings.
- Join our [Slack Channel #free-covid-consultations @ COVID19 Global Hackathon](https://join.slack.com/t/globalcovidhackathon/shared_invite/zt-d25lrhkl-UAKmMq4h_zNzCQhqnNsbfw) for more info!

#### [Project Shared Living Document on Notion](https://www.notion.so/careconsult)⭐
#### [DevPost Global Hackathon](https://devpost.com/software/careconsult-xbvp3u)
#### [HelpWithCovid](https://helpwithcovid.com/)

### Pending Tasks
- [ ] Fix Resize/Delete Events
- [ ] Improve Footer Component
- [ ] More branding/marketing assets (text, images)
- [ ] Social Media Assets/Strategy
- [ ] Better design
- [ ] Fix Signup (@Marcos on the ticket)
- [x] Hide Login Button When Logged In
- [x] Calendar Component ([suggestion](https://github.com/jquense/react-big-calendar))
- [x] SignUp/SignIn screens frontend

#### Pending User Stories
- A user can sign up with the role of volunteer. (⏳pending)
- A user with the role of volunteer can create time slots of available remote consultation time. (⏳pending)
- Any user (not logged in) can book a time with an available volunteer. (⏳pending)
    - The user's email is requested and an email and calendar invite is sent to both booker and volunteer. (⏳pending)
    - That timeslot is blocked for other users. (⏳pending)

### Wireframe
![wireframe](care-consult-wireframe-v1.png)

## Other Features
- Video chat functionality? Doxy.me
- Ability for providers to initiate verification process
- Would need to hook into various state medical board DBs in the US
- Ability for platform to take into account license expiration date
- Add other types of certified health professionals? Psychologists etc. 
- Seed list of providers? Can start with NYC medical board website and scrape Dr list? 

### Installation

```bash
git clone git@github.com:marcoscannabrava/free-covid-consultation-calendar.git care-consult
cd care-consult
yarn
yarn develop
```

# Tech Stack
- [React + Gatsby](https://www.gatsbyjs.org/)
- [Firebase](https://firebase.google.com/)
- [Netlify](https://www.netlify.com/)
- kudos to: [gatsby-starter-netlify-cms](https://github.com/netlify-templates/gatsby-starter-netlify-cms)
