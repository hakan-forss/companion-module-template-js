const scoreData = () => {
    return {
		Game : {
/*			HasBall: '',
			Down:'',
			Togo: '',
			Spot:'',
			Period:'',
            PeriodShort:'',
            PeriodLong:'',
            Date:'',
            Start:'',
            Venue:'',
            City:'',
            Copyright:'',
            BroadcasterName:'',
            BroadcasterWebsite:'',
            BroadcasterLogo:'',
            BroadcasterLogoSmall:'',
            LeagueLogo:'',
            LeagueLogoSmall:'',
*/
            },
		//Home : team(),
		//Visit : team(),
        //Settings : settings(),
    }
};

function team(){
    return{
        Score:'',
        TimeOutsLeft:'',
        NameLong:'',
        NameShort:'',
        Mascot:'',
        Logo:'',
        LogoSmall:'',
        Color:'',
        Record:'',
        RecordOverall:'',
        RecordConference:'',
        Ranking:'',


    }
}

function period(){
    return{
        PeriodShort:'1st',
        PeriodLong:'1st Quarter',
    }
}

function toggle(){
    return {
        ToggleName:'',
        ToggleValue:'',
        Toggle:'',
        ToggleAlternate:'',
        ToggleImage:'',
        ToggleImageAlternate:'',
    }
}

function counter(){
    return {
        CounterName:'',
        CounterValue:'',
        Counter:'',
        CounterAlternate:'',
        CounterImage:'',
        CounterImageAlternate:'',
    }
}

exports.scoreData = scoreData;