const scoreData = (self) => {
    return {
		Game : {
			HasBall: '',
			Down:'1',
            DownShort:'1st and',
			Togo: '10',
            TogoShort:'10',
			Spot:'',
			Period:'1',
            PeriodShort:'1st',
            PeriodLong:'1st Quater',
            Date:'',
            Start:'',
            Venue:'',
            City:'',
            Copyright:self.config.copyright,
            BroadcasterName: self.config.broadcasterName,
            BroadcasterWebsite:self.config.broadcasterWebsite,
            BroadcasterLogo:self.config.broadcasterLogo,
            BroadcasterLogoSmall:self.config.broadcasterLogoSmall,
            LeagueLogo:'',
            LeagueLogoSmall:'',

            },
		Home : team(),
		Visit : team(),
        Settings : settings(self),
        Context: [
                    {
                        Name: 'ContextValue1',
                        Value: ''
                    }
                ]
    }
};

function team(){
    return{
        Score:0,
        TimeoutsLeft:3,
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

function settings(self){
    return {
        Toggles: getToggles(self),
    }
}

function getToggles(self){
    let toggles =[]
    console.log(self.config)
    for (let i = 0; i < 30; i++) {
        toggles.push(
            {
                Id:(i+1),
                Name:self.config['name_' +(i+1)],
                State:self.config['state_' +(i+1)],
                ValueTrue: self.config['valueTrue_' +(i+1)],
                ValueFalse: self.config['valueFalse_' +(i+1)],
                ImageTrue: self.config['imageTrue_' +(i+1)],
                ImageFalse: self.config['imageFalse_' +(i+1)],
                get Value() {
                    return this.State?this.ValueTrue:this.ValueFalse
                },
                get ValueAlternate() {
                    return !this.State?this.ValueTrue:this.ValueFalse
                },
                get Image(){
                    return this.State?this.ImageTrue:this.ImageFalse
                },
                get ImageAlternate(){
                    return !this.State?this.ImageTrue:this.ImageFalse
                },
       
             }
        )
        
    }
    
    return toggles
}


exports.scoreData = scoreData;