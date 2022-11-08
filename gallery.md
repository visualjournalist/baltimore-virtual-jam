---
layout: default
title: Portrait paintings
image: poster-portraits__w1280.jpg
excerpt: Selected portraits.
exclude_from_nav: true
---
<article class="post">
	<div class="vj__grid__full" style="margin-bottom: 60px; margin-top: 85px;">
		<div class="vj__grid" style="margin-bottom: 0;">
			<div class="post-content">
				<h2><a href="./portraits/">Portraits</a></h2>
				<p style="color: #999;">Select a portrait to see the full painting.</p>
				<div class="vj__grid__full " style="margin-top: 10px;">
						<div class="vj__grid__full"><!--
						{% assign currentCat = 'portraits' %}
						{% assign counter = 0 %}
						{% for post in site.categories[currentCat] reversed %}
							{% if counter < 6 %}
								{% if post.featured %}
								 --><div class="vj__grid__element">
										<a class="post-link" href="{{ post.url | relative_url }}">
											<picture>
												<source srcset="{{site.url}}/img/{{ post.thumbnail }}" media="(min-width: 992px)">
												<img src="{{site.url}}/img/{{ post.thumbnail | replace: 'w640_h640', 'w420_h420' }}" title="{{ post.title }}" alt="{{ post.alt }}">
											</picture>	
										</a>
									</div><!--
									{% assign counter = counter | plus: 1 %}
								{% endif %}
							{% endif %}
						{% endfor %}
						-->
					</div>
				</div>
			</div>
		</div>
	</div>
</article>
{% include footer.html %}
<style type="text/css">
	.vj__grid__full	img {
		border: none !important;
		display: block;
	}
</style>


