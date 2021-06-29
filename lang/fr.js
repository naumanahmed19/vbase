export default {
  fr: {
    dashboard: {
      trips: 'Trajets',
      details: 'Détails',
    },
    menu: {
      teamSelector: {
        numberOfTeams: 'Aucune Team | 1 Team | {count} Teams',
        search: 'Search a team', // TODO
      },
      liveop: 'Geoloc',
      dashboard: 'Trajets',
      realtime: 'Flotte',
      diagnostic: 'Diagnostic',
      expert: 'Expert',
      reports: 'Rapport',
      analytics: 'Analytics',
      settings: 'Paramètres Team',
      teamdoc: 'Documents Team',
      graph: 'Graph', // TODO

      // Team Settings
      device: 'Boîtiers',
      teamprofile: 'Profil Team',
      devicesettings: 'Paramètres Boîtiers',
      assets: 'Parc',
      asset: 'Parc',
      driver: 'Conducteurs',
      third: 'Contrôle Accès',
      alert: 'Alertes',
      trackingaccess: 'Accès Tracking',
      eventrouter: 'EventRouter',
      tachod: 'TachoDownload',
      membership: 'Gestion des droits',
    },
    nav: {
      // Dropdown Header
      settingGen: 'Paramètres',
      contact: 'Contactez Nous',
      kiosk: 'Kiosk',
      logout: 'Déconnexion',
    },
    settings: {
      nav: {
        profile: 'Profil',
        teams: 'Mes Teams',
        api: 'Personal Access Token',
        oauth: 'Application OAuth',
      },
      profile: {
        contactinfo: 'Profil',
        name: 'Nom',
        email: 'Email',
        language: 'Langue',
        timezone: 'Fuseau Horaire',
        updatepassword: 'Modifier Mot De Passe',
        currentpassword: 'Mot de Passe Actuel',
        password: 'Nouveau Mot de Passe',
        confirmpassword: 'Confirmez',
      },
      teams: {
        title: 'Teams',
        name: 'Nom',
        owner: 'Propriétaire',
        leave: 'Quitter Team',
        create: 'Créer Team',
        nameF: 'Nom Team',
      },
      api: {
        title: 'API Tokens',
        nameField: 'Nom Token',
        deleteMsg: 'Are you sure you want to delete this token? If deleted, API requests that attempt to authenticate using this token will no longer be accepted.', // TODO
      },
      oauth: {
        title: 'Clients OAuth',
        nameField: 'Nom Client',
        secret: 'Secret',
        redirectField: 'URL Redirection',
        nameFieldMsg: '', // TODO
        redirectFieldMsg: '', // TODO
        deleteMsg: 'Êtes-vous sûr de vouloir supprimer ce client ?',
      },
    },
    poieditor: {
      title: 'Points d\'intérêts',
      add_new_point: 'Ajouter nouveau point',
      save_geofence: 'Sauvegarder geofence',
      edit_geofence: 'Modification geofence',
      geofence_name: 'Nom de la geofence',
      create_new_geofence: 'Création de geofence manuelle',
      update_geofence: 'Modification de geofence manuelle',
      Update_title: 'Update Item', // TODO
    },

    common: {
      action: {
        create_batch: 'Créer un lot',
        clear: 'Effacer',
        click_refresh: 'Cliquez ici pour rafraîchir',
        edit: 'Editer {e}',
        edit_selection: 'Editer selection',
        export: 'Exporter {e}',
        refresh: 'Rafraîchir',
        update: 'Sauvegarder Modification',
        delete: 'Supprimer',
        add: 'Ajouter',
        filter: 'Filtrer',
        clearFilter: 'Réinitialiser',
        save: 'Sauvegarder',
        close: 'Quitter',
        next: 'Prochaine  Étape',
        clipboard: 'Copier dans presse-papier',
      },
      sidebar: {
        edit: 'Editer',
        add: 'Ajouter',
      },
      msgs: {
        post: 'Ressource à été crée avec succès',
        update: 'Sauvegarde Réussie',
        error: 'Erreur lors de la sauvegarde. Veuillez essayer plus tard',
        noData: 'Aucune Donnée',
        loading: 'Chargement ...',
        not_available: 'Indisponible',
        no_results: 'This search did not return any result', // TODO:
        err_network: 'Something went wrong. Please try again or contact customer support.', // TODO:
      },


      computer: {
        ip: 'adresse IP',
        data: 'données',
        download: 'Télécharger',
      },

      empty: {
        not_set: 'pas paramétré',
        no_activity: 'aucune activité',
        never_done: 'jamais',
        not_active: 'pas actif',
        none: 'aucun',
      },

      errors: {
        500: 'Une erreur s\'est produite. Veuillez rééssayer plus tard.',
      },

      menu: {
        add: 'Ajouter',
        add_metadata: 'Ajouter Metadonnées',
        apply_filter: 'Filtrer',
        dashboard: 'Tableau de Bord',
        cancel: 'Annuler',
        content: 'Contenu',
        more_filter: 'Plus de filtres',
        reset: 'Réinitialiser',
        search: 'Chercher {r}',
        select: 'Sélectionner {s}',
        selected: '{nb} {r} sélectionné | {nb} {r} sélectionnés',
      },

      resource: {
        device: 'boîtier | boîtiers',
        lifecycle_short: 'Cycle',
        setting: 'paramètre|paramètres',
        vehicle: 'véhicule | véhicules',
        asset: 'élément | élément',
        fleet: 'Flotte',
      },

      word: {
        content: 'contenu',
        created: 'création',
        identity: 'identité',
        cancel: 'annuler',
        name: 'nom',
        origin: 'origine',
        who: 'qui',
        other: 'autre',
        optional: 'Optionnel',
        yes: 'Yes',
      },

      hello: 'bonjour',
      type: 'type',
      name: 'nom',
      priority: 'priorité',
      rule: 'règle',
      preset: 'préréglage | préréglages',
      clearall: 'tout effacer',
      selectall: 'Tout Selectionner',
      searchvehicle: 'chercher véhicule',
      choosepoi: 'choisir POI',
      searchprovider: 'chercher source',
      searchevent: 'chercher évènement',
      warninglight: 'voyant',
      mileage: 'Kilométrage',
      restoreRessource: 'voulez-vous restaurer ce {ressource}',
      no_data_in_selected_period: 'Pas de données disponible dans la période sélectionnée.',
      loading_data: 'Chargement des données',
      last_data: 'dernière donnée',
      first_data: 'première donnée',
      none: 'aucune',
      minor: 'mineure',
      major: 'majeure',
      critical: 'critique',
      criticity: 'criticité',
      last_activity: 'dernière activité',
      state: 'état',
      no_activity: 'aucune activité.',
      in_progress: 'En Cours',
      completed: 'Terminé',
      speed: 'vitesse',
      screenshot: 'Capture d\'écran',
      data: 'données',
      payload: 'message',
      metadata: 'métadonnées',
      value: 'valeur',
      fleet: 'flotte',
      na: 'Non Disponible',
      vehicle: 'véhicule | véhicules',
      new_password: 'nouveau mot de passe',
      password: 'mot de passe',
      clipboard: 'Copier dans le presser-papier',
      cancel: 'Annuler',
      key_value: 'clef/valeur',
      add: 'ajouter',
      search_location: 'Search location', // TODO
    },

    fleet: {
      loading_fleet: 'chargement flotte',
      commloss: 'perte de communication',
      gpsi: 'perte GPS',
      w: 'en exploitation',
      pod: 'garé en ligne',
      depot: 'au dépôt',
      commlossgpsi: 'perte de communication \n perte GPS',
      wfm: 'en exploitation',
      wfc: 'en exploitation',
      terminus: 'Au terminus',
      inactive: 'inactif',
      map: {
        plan: 'Vue Plan',
        satellite: 'Vue Satellite',
        autozoom: 'Activer autozoom',
      },
    },


    diagnostic: {
      non_filtered_events: 'Défauts Non Validés',
      out_of_duty_events: 'evènements hors-ligne',
      validation_date: 'Date détection',
      event_start_date: 'Date début évênement',
    },

    expert: {
      evtdate: 'date evènement',
      senddate: 'date de réception',
      evtcode: 'code',
      evtdesc: 'description',
      evtstate: 'état',
      displaytcrk: 'afficher parcours',
      displayoff: 'afficher EVENT OFF',
      displayunqualified: 'défauts non validés',
      outsidepoi: 'Hors POI',
      map: 'Carte ({number} selectionné) | Carte ({number} selectionnés) |Carte ({number} selectionnés)',
      nativecode: 'code natif',
      numberofsatellite: 'nombre de satellites',
      provider: 'source',
      loading: 'Chargement des données...',
      failloading: 'Aucune donnée disponible pour cette période.',
      not_valid: 'Non Valide',
    },

    vehicle: {
      restoreVin: 'Le VIN {vin} est associé à un véhicule ayant été supprimé le {date}. Voulez-vous le restaurer ? ',
      restorePlate: 'L\'immatriculation {plate} est associé à un véhicule ayant été supprimé le {date}. Voulez-vous le restaurer ? ',
      code: 'code',
      light: 'voyant',
      description: 'description',
      occurences: 'occurences',
      affected_vehicles: 'véhicules concernés',
      criticity: 'criticité',
      internal_id: 'N° parc',
      manufacturer: 'Constructeur',
      model: 'Modèle',
      total_mileage: 'Kilométrage',
      mileage: 'kilométrage période',
      total_fuel_used: 'total carburant',
      fuel_used: 'carburant période',
      avg_fuel_used: 'conso. moyenne',
      engine_hours: 'heures moteur période',
      total_engine_hours: 'total heures moteur',
      search_vehicle: 'Véhicule(s)',
      no_vehicle_matching_criterias: 'aucun véhicule correspondant à vos paramètres.',
      plate: 'Immatriculation',
    },

    tigr: {
      ADBL: 'Niveau AdBlue',
      AIRCIRCID: 'identifiant circuit d\'air',
      ALTERNATORID: 'identifiant alternateur',
      BEP1: 'pression suspension avant gauche',
      BEP2: 'pression suspension avant droite',
      BEP3: 'pression suspension arrière gauche',
      BEP4: 'pression suspension arrière droite',
      BEP5: 'pression suspension milieu gauche',
      BEP6: 'pression suspension milieu droite',
      BRKP1: 'pression du circuit d\'air 1',
      BRKP2: 'pression du circuit d\'air 2',
      BRKP3: 'pression du circuit d\'air 3',
      BRKP4: 'pression du circuit d\'air 4',
      BRKP5: 'pression du circuit d\'air 5',
      BRKP6: 'pression du circuit d\'air 6',
      BRKSTS: 'statut de la pédale de frein',
      CodeVMC: 'code natif',
      DEVTYP: 'type d\'appareil',
      DEVID: 'identifiant de l\'appareil',
      DOORID: 'identifiant porte',
      DOP: 'précision de positionnement',
      EVD: 'durée évènement',
      FOD: 'distance parcourue avec le défaut',
      GEAR: 'rapport engagé',
      GNSSType: 'système GNSS',
      HBRC: 'charge restante batterie hybride',
      HEAD: 'direction',
      LMC: 'niveau carburant',
      LMC2: 'niveau carburant 2',
      LRO: 'niveau huile moteur',
      MBD: 'distance freinage durant trajet',
      MBT: 'durée freinage durant trajet',
      MDO: 'nombre d\'ouverture de porte durant trajet',
      MEI: 'heure moteur éteint durant trajet',
      MEO: 'heures moteur allumé durant trajet',
      MFU: 'carburant utilisé durant trajet',
      MFUG: 'carburant utilisé (gazeux) durant trajet',
      MKO: 'temps contact allumé durant trajet',
      MVDH: 'distance parcourue durant trajet',
      NUMSAT: 'nombre de satellite disponible',
      PAC: 'position de la pédale d\'acceleration',
      PBR: 'position de la pédale de frein',
      PRO: 'pression huile moteur',
      RPM: 'vitesse moteur',
      RPT: 'pourcentage de couple du ralentisseur',
      SMX: 'vitesse',
      STP: 'statut des portes',
      SWA: 'angle du volant',
      TAM: 'temps écoulé depuis démarrage moteur',
      TCA: 'temps écoulé depuis contact allumé',
      TD2C: 'nombre total ouverture porte#2',
      TD3C: 'nombre total ouverture porte#3',
      TDFC: 'nombre total ouverture porte avant',
      TDRC: 'nombre total ouverture porte arrière',
      TEO: 'temps moteur total',
      TES: 'nombre total de démarrage moteur',
      TFU: 'carburant total utilisé',
      TFUG: 'carburant total (gazeux) utilisé',
      TMX: 'température huile de transmission',
      TRM: 'témparature du liquide de refroidissement',
      TRO: 'température huile moteur',
      TTO: 'température huile de transmission',
      TVD: 'distance total',
      VB: 'tension batterie',
      VMCR1: 'usure plaquette de frein pour plaquette de frein 1',
      VMCR2: 'usure plaquette de frein pour plaquette de frein 2',
      VMCR3: 'usure plaquette de frein pour plaquette de frein 3',
      VMCR4: 'usure plaquette de frein pour plaquette de frein 4',
      VMCR5: 'usure plaquette de frein pour plaquette de frein 5',
      VMCR6: 'usure plaquette de frein pour plaquette de frein 6',
      WHEELID: 'identifiant roue',
      WORNPERC: 'the wear-out related of the brake pad in fault',
    },

    actions: {
      edit: 'Editer',
      delete: 'Supprimer',
    },

    eventcontextfilter: {
      rule: 'aucune règle|règle|règles',
      mechanical: 'Mécanique',
      its: 'ITS',
      driving: 'Conduite',
    },

    date: {
      day: 'jour | jours',
      month: 'mois | mois',
      week: 'semaine | semaines',
      abbrday: 'j',
      abbrhour: 'h',
      abbrmn: 'min|mins',
      lastweek: 'dernière semaine',
      lastxhours: 'dernière {hours}H',
      today: 'aujourd\'hui',
      lastmonth: 'dernier mois',
      custom: 'personnalisé',
      startdate: 'début',
      enddate: 'fin',
      from: 'du',
      to: 'au',
    },

    tracking: {
      access_name: 'nom accès',
      avail: 'La carte sera accessible à partir de cette date et heure',
      edit: 'Editer Accès',
      clipboard: 'Copier Lien Accès',
      create: 'Créer Accès',
      update: 'Editer Accès',
      placeholder_description: 'Ex: Visite, Seminaire',
      new_access: 'Création d\'un nouvel accès',
      tracking: 'Accès Tracking',
    },

    devices: {
      searchdevice: 'Chercher boîtier',
      serial: 'N\u00B0 série',
      last_activity: 'dernière activité',
      dataplan: 'abonnement',
      btle_purpose: 'bluetooth pour',
      last_v1b: 'dernier V1B',
      hardware: 'modèle boîtier',
      active_since: 'actif depuis',
      private_note: 'Private Note',
      note: 'Note',
      empty: {
        factory_settings: 'réglages d\'usine',
        created: 'crée',
      },

      status: {
        of: 'Avec problèmes',
        pfu: 'En attente de MAJ firmware',
        psu: 'En attente de MAJ paramètre',
        pfsu: 'En attente de MAJ paramètre & firmware',
        na24: 'Pas actif depuis 24H',
        na: 'Jamais activé',
        btle_active: 'Bluetooth : actif',
      },


      single: {
        nfc_mac_address: 'Adresse MAC NFC',
        issues: 'Problèmes',
        events: 'Evènements',
        history: 'Historique',
        forwarding: 'Transfert de Données',
        qualified: 'qualification',
        mess_diag: 'Si vous souhaitez afficher le status de ce boîtier, veuillez effectuer un diagnostic.',
      },

      forwarding: {
        store_pos: 'Ne pas stocker position',
        push_pos: 'Envoyer position à l\'arrêt',
        girouette: 'Vehicule avec girouette',
        enable: 'Activer transfert de données vers',
      },
      action: {
        edit_batch: 'Editer Lot Boîtier',
        import_devices: 'Importer Boîtiers',
        create_device: 'Créer Boîtier',
      },
      batch: {
        create_title: 'Créer Lot Boîtier',
        edit_title: 'Editer lot de {count} boîtiers',
        detected: '{count} boîtiers détectés',
        succes: 'added !', // TODO
        error: 'L\'opération a echoué pour les boîtiers suivants: ',
        update_action: 'Mettre à jour {count} boîtiers',
        succes_devices: '{count} boîtiers ont été mis à jour',
        succes_command: 'Commande envoyé à {count} boîtiers',
      },
    },

    driver: {
      name: 'Nom',
      first_name: 'Prénom',
      last_name: 'Nom de Famille',
      delete: 'Supprimer',
      card_number: 'N\u00B0 Carte ',
      tag: 'Tag NFC',
      credentials: 'identifiant',
      search: 'Chercher Conducteurs',
      access_control: 'Contrôle Accès',
      active_access_control: 'Activer Contrôle Accès',
      form: {
        new: 'Nouveau Conducteur',
        update: 'Sauvegarder Modification',
        create: 'Sauvegarder',
        edit: 'editer fiche conducteur: {last} {first}',
      },
    },

    assets: {
      new: 'Nouvel Elément',
      internal_id: 'ref. Interne',
      plate: 'immat.',
      manufacturer: 'constructeur',
      model: 'modèle',
      fuel: 'fuel / énergie',
      plug_device: 'associer au boîtier',
      speed_unit: 'unité de vitesse',
      data_source: 'source de données',
      subtype: 'sous-type',
      display_data: 'Afficher Données',
      export_data: 'Exporter Données',
      delete: 'Êtes-vous sûr de vouloir supprimer cet élément de votre flotte ?',
      size: 'Gabarit',
      type: {
        ship: 'navire',
        truck: 'camion',
        excavator: 'excavateur',
        crane: 'grue',
        motocycle: 'moto',
        tank: 'réservoir',
        weather_station: 'station météo',
        chargin_station: 'station de charge',
        coach: 'Car',
        trolley: 'Trolley',
        brt: 'BNHS',
        lcv: 'VUL',
        lowEntry: 'Low-Entry',
        cv: 'VU',
        tram: 'Tram',
        pc: 'VP',
      },

      sizes: {
        standard: 'Standard',
        articulated: 'Articulé',
        biarticulated: 'Bi-articulé',
        midibus: 'Midibus',
        minibus: 'Minibus',
        reduced: 'Réduit',
        tripleAxle: 'Triple-essieux',
        doubleDecker: 'A impérial',
      },

      exports: {
        asset: {
          title: 'Parc',
          description: 'Exporter votre parc',
        },

        asset_data: {
          title: 'Données du Parc',
          description: 'Exporter les données de votre parc',
        },
      },
    },

    access_control: {
      passengers: {
        created_passenger: 'Le passager a été crée!',
        deleted_passenger: 'Êtes-vous sûr de vouloir supprimer le passager?',
        load_from_file: 'CHARGER FICHIER PASSAGERS',
      },

      reports: {
        startingfrom: 'Commençant du',
        to: 'au',
        dltar: 'TELECHARGER COMPTE RENDU D\'ANALYSE DU TRAFFIC',
        dlrd: 'TELECHARGER DONNEES BRUTES',
      },

    },

    rtv: {
      device: 'Boîtier',
      asset: 'Véhicule',
      lastposition: 'Der. Position',
      lasttelemetry: 'Der. Données',
      speed: 'Vitesse GPS',
      nomatch: 'Aucun Résultat Trouvé',
      loading: 'Chargement Des Véhicules',
      noasset: 'Aucun Véhicule',
      name: 'Nom',
      value: 'Valeur',
      unavailable: 'Non Disponible',
      elevation: 'Altitude',
      all: 'Tous',
      online: 'En Ligne',
      hide: 'Selection',
      searchFiled: 'Chercher Parc',
      plateField: 'Immat.',
      labelTypeField: 'Type Label',
      searchTypeField: 'Chercher par',
      btnSendCommand: 'Envoyer Commande',
    },

    users: {
      new_invite: 'Nouvelle Invitation',
      pending_invitations: 'En Attente',
      edit: 'Editer',
      remove: 'Supprimer',
      new_user: 'Nouvel Utilisateur',
      edit_user: 'Editer Utilisateur',
      search_placeholder: 'Nom, Email',
      pat: {
        msg: 'Here is your new API token. This is the only time the token will ever be displayed, so be sure not to lose it! You may revoke the token at any time from your API settings.', // TODO

      },
    },
    login: {
      action: 'Connexion',
      remember: 'Se souvenir de moi',
      wait: 'Merci de bien vouloir patienter...',
      forgot: {
        action: 'Envoyer Lien de Réinitialisation',
        goBack: 'Retour',
        forgotPass: 'Mot de passe oublié ?',
      },
    },
    register: {
      action: 'Register', // TODO:
      accept: 'I accept', // TODO:
      terms: 'terms of service', // TODO:
      success: 'Registration Successful', // TODO:
    },
    analytics: {
      duration: 'Durée Période',
      msgs: {
        start_date: 'La date de fin est inférieure à la date de début',
        max_hours: 'Vous ne pouvez pas sélectionner plus de 24h de télémétrie',
        select: 'Sélectionner un élément',
      },
    },
    tacho: {
      add: 'Request Download', // TODO:
      title: 'New Download Request', // TODO:
    },

    graphalyzer: {
      msgs: {
        select: 'Selectionner une resource',
      },
      add_group: 'Ajouter un groupe',
      group_name: 'Nom Groupe',
      signals: 'Signals',
      fetch: 'Rechercher Données',
      fetch_next: 'Prochains Résultats',
      limited_results_from: 'Résultats limités du: ',
      limited_results_to: 'au ',
      select_signals: 'Selectionner Signals',
      select_group: 'Selectionner Groupe',
      no_signal_selected: 'Aucun signal selectionné',
    },
  },
};
