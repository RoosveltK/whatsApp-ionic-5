import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss'],
})
export class DiscussionComponent implements OnInit {
  @Input() nom: string;
  @Input() heure: string;
  @Input() message: string;
  @Input() image: string;

  constructor() {}

  ngOnInit() {}
}
